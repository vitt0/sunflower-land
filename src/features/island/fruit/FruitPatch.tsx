import React, { useContext, useState } from "react";

import { PIXEL_SCALE } from "features/game/lib/constants";
import { Context } from "features/game/GameProvider";
import { plantAudio, harvestAudio, treeFallAudio } from "lib/utils/sfx";
import { FruitName } from "features/game/types/fruits";
import { FruitTree } from "./FruitTree";
import Decimal from "decimal.js-light";
import { getRequiredAxeAmount } from "features/game/events/landExpansion/fruitTreeRemoved";
import { useSelector } from "@xstate/react";
import { MachineState } from "features/game/lib/gameMachine";
import {
  Collectibles,
  FruitPatch as Patch,
  InventoryItemName,
  PlantedFruit,
} from "features/game/types/game";
import { isCollectibleBuilt } from "features/game/lib/collectibleBuilt";
import { ResourceDropAnimator } from "components/animation/ResourceDropAnimator";
import fruitPatchDirt from "assets/fruit/fruit_patch.png";
import powerup from "assets/icons/level_up.png";
import { getBumpkinLevel } from "features/game/lib/level";
import { getBumpkinLevelRequiredForNode } from "features/game/expansion/lib/expansionNodes";

const HasAxes = (
  inventory: Partial<Record<InventoryItemName, Decimal>>,
  collectibles: Collectibles,
  fruit?: PlantedFruit
) => {
  const axesNeeded = getRequiredAxeAmount(
    fruit?.name as FruitName,
    inventory,
    collectibles
  );

  // has enough axes to chop the tree

  if (axesNeeded.lte(0)) return true;

  return (inventory.Axe ?? new Decimal(0)).gte(axesNeeded);
};

const selectInventory = (state: MachineState) => state.context.state.inventory;
const selectCollectibles = (state: MachineState) =>
  state.context.state.collectibles;
const compareFruit = (prev?: Patch, next?: Patch) =>
  JSON.stringify(prev) === JSON.stringify(next);
const compareCollectibles = (prev: Collectibles, next: Collectibles) =>
  isCollectibleBuilt("Foreman Beaver", prev) ===
  isCollectibleBuilt("Foreman Beaver", next);

const _bumpkinLevel = (state: MachineState) =>
  getBumpkinLevel(state.context.state.bumpkin?.experience ?? 0);

interface Props {
  id: string;
  index: number;
}

export const FruitPatch: React.FC<Props> = ({ id, index }) => {
  const { gameService, selectedItem, shortcutItem } = useContext(Context);

  const [playShakingAnimation, setPlayShakingAnimation] = useState(false);
  const [collectingFruit, setCollectingFruit] = useState(false);
  const [collectingWood, setCollectingWood] = useState(false);
  const [collectedFruitName, setCollectedFruitName] = useState<FruitName>();
  const [collectedFruitAmount, setCollectedFruitAmount] = useState<number>();
  const [collectedWoodAmount, setCollectedWoodAmount] = useState<number>();
  const fruitPatch = useSelector(
    gameService,
    (state) => state.context.state.fruitPatches[id],
    compareFruit
  );
  const fruit = fruitPatch?.fruit;
  const fertiliser = fruitPatch.fertiliser;
  const collectibles = useSelector(
    gameService,
    selectCollectibles,
    compareCollectibles
  );
  const inventory = useSelector(
    gameService,
    selectInventory,
    (prev, next) =>
      HasAxes(prev, collectibles, fruit) === HasAxes(next, collectibles, fruit)
  );
  const hasAxes = HasAxes(inventory, collectibles, fruit);

  const bumpkinLevelRequired = getBumpkinLevelRequiredForNode(
    index,
    "Fruit Patch"
  );
  const bumpkinLevel = useSelector(gameService, _bumpkinLevel);
  const bumpkinTooLow = bumpkinLevel < bumpkinLevelRequired;

  const plantTree = async () => {
    if (selectedItem === "Fruitful Blend") {
      fertilise();
      return;
    }

    try {
      const newState = gameService.send("fruit.planted", {
        index: id,
        seed: selectedItem,
      });

      if (!newState.matches("hoarding")) {
        plantAudio.play();
      }
    } catch {
      undefined;
    }
  };

  const fertilise = () => {
    try {
      gameService.send("fruitPatch.fertilised", {
        patchID: id,
        fertiliser: selectedItem,
      });
    } catch {
      undefined;
    }
  };

  const harvestFruit = async () => {
    if (bumpkinTooLow) return;
    if (!fruitPatch) return;

    const newState = gameService.send("fruit.harvested", {
      index: id,
    });

    if (!newState.matches("hoarding")) {
      setCollectingFruit(true);
      setCollectedFruitName(fruit?.name);
      setCollectedFruitAmount(fruit?.amount);

      harvestAudio.play();
      setPlayShakingAnimation(true);

      await new Promise((res) => setTimeout(res, 3000));

      setCollectingFruit(false);
      setCollectedFruitName(undefined);
      setCollectedFruitAmount(undefined);
      setPlayShakingAnimation(false);
    }
  };

  const removeTree = async () => {
    if (!hasAxes) return;

    if (
      !isCollectibleBuilt("Foreman Beaver", collectibles) ||
      fruit?.name === "Blueberry"
    )
      shortcutItem("Axe");

    const newState = gameService.send("fruitTree.removed", {
      index: id,
      selectedItem: "Axe",
    });

    if (!newState.matches("hoarding")) {
      setCollectingWood(true);
      setCollectedWoodAmount(1);

      treeFallAudio.play();

      await new Promise((res) => setTimeout(res, 3000));

      setCollectingWood(false);
      setCollectedWoodAmount(undefined);
    }
  };

  return (
    <div className="w-full h-full relative">
      {/* Fruit patch soil */}
      <img
        src={fruitPatchDirt}
        className="absolute pointer-events-none"
        style={{
          width: `${PIXEL_SCALE * 30}px`,
          left: `${PIXEL_SCALE * 1}px`,
          top: `${PIXEL_SCALE * 2}px`,
        }}
      />

      {/* Fruit tree stages */}
      <FruitTree
        bumpkinLevelRequired={bumpkinLevelRequired}
        plantedFruit={fruit}
        plantTree={plantTree}
        harvestFruit={harvestFruit}
        removeTree={removeTree}
        fertilise={fertilise}
        playShakingAnimation={playShakingAnimation}
        hasAxes={hasAxes}
      />

      {/* Fertiliser */}
      {!!fertiliser && (
        <img
          className="absolute z-10 pointer-events-none"
          src={powerup}
          style={{
            width: `${PIXEL_SCALE * 5}px`,
            bottom: `${PIXEL_SCALE * 16}px`,
            right: `${PIXEL_SCALE * 2}px`,
          }}
        />
      )}

      {/* Fruit drop animation */}
      {collectingFruit && (
        <ResourceDropAnimator
          resourceName={collectedFruitName}
          resourceAmount={collectedFruitAmount}
        />
      )}

      {/* Wood drop animation */}
      {collectingWood && (
        <ResourceDropAnimator
          resourceName={"Wood"}
          resourceAmount={collectedWoodAmount}
        />
      )}
    </div>
  );
};
