import React, { useContext, useState } from "react";
import { useSelector } from "@xstate/react";

import { CROPS, CropName } from "features/game/types/crops";
import { ITEM_DETAILS } from "features/game/types/images";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { GrowthStage, Soil } from "features/island/plots/components/Soil";
import { Bar, LiveProgressBar } from "components/ui/ProgressBar";
import { InnerPanel } from "components/ui/Panel";

import powerup from "assets/icons/level_up.png";

import { TimerPopover } from "../../common/TimerPopover";
import useUiRefresher from "lib/utils/hooks/useUiRefresher";
import classNames from "classnames";
import {
  Bumpkin,
  Collectibles,
  CropFertiliser,
  CropPlot,
  GameState,
  Inventory,
} from "features/game/types/game";
import { SUNNYSIDE } from "assets/sunnyside";

import { getCropTime } from "features/game/events/landExpansion/plant";

import { MachineState } from "features/game/lib/gameMachine";
import { Context } from "features/game/GameProvider";
import { getBumpkinLevel } from "features/game/lib/level";

const _bumpkinLevel = (state: MachineState) =>
  getBumpkinLevel(state.context.state.bumpkin?.experience ?? 0);

interface Props {
  bumpkinLevelRequired: number;
  cropName?: CropName;
  inventory: Inventory;
  collectibles: Collectibles;
  bumpkin?: Bumpkin;
  buds?: NonNullable<GameState["buds"]>;
  plot: CropPlot;
  plantedAt?: number;
  fertiliser?: CropFertiliser;
  procAnimation?: JSX.Element;
  touchCount: number;
  showTimers: boolean;
}

const FertilePlotComponent: React.FC<Props> = ({
  bumpkinLevelRequired,
  cropName,
  inventory,
  collectibles,
  bumpkin,
  buds,
  plot,
  plantedAt,
  fertiliser,
  procAnimation,
  touchCount,
  showTimers,
}) => {
  const [showTimerPopover, setShowTimerPopover] = useState(false);
  const [showBumpkinLevel, setShowBumpkinLevel] = useState(false);

  const [_, setRender] = useState<number>(0);

  let harvestSeconds = cropName ? CROPS()[cropName].harvestSeconds : 0;
  const readyAt = plantedAt ? plantedAt + harvestSeconds * 1000 : 0;

  let startAt = plantedAt ?? 0;
  if (cropName && bumpkin) {
    const fertiliserName = fertiliser?.name ?? undefined;
    harvestSeconds = getCropTime({
      crop: cropName,
      inventory,
      collectibles,
      bumpkin,
      buds: buds ?? {},
      plot,
      fertiliser: fertiliserName,
    });
    startAt = readyAt - harvestSeconds * 1000;
  }
  const timeLeft = readyAt > 0 ? (readyAt - Date.now()) / 1000 : 0;
  const isGrowing = timeLeft > 0;

  // REVIEW: Is this still needed after changing to LiveProgressBar?
  useUiRefresher({ active: isGrowing });

  const growPercentage = 100 - (timeLeft / harvestSeconds) * 100;
  const stage: GrowthStage | undefined = !cropName
    ? undefined
    : growPercentage >= 100
    ? "ready"
    : growPercentage >= 50
    ? "almost"
    : growPercentage >= 25
    ? "halfway"
    : "seedling";

  const { gameService } = useContext(Context);
  const bumpkinLevel = useSelector(gameService, _bumpkinLevel);
  const bumpkinTooLow = bumpkinLevel < bumpkinLevelRequired;

  const handleMouseEnter = () => {
    if (bumpkinTooLow) {
      setShowBumpkinLevel(true);
      return;
    }
    // show details if field is growing
    if (isGrowing) {
      // set state to show details
      setShowTimerPopover(true);
    }
  };

  const handleMouseLeave = () => {
    setShowBumpkinLevel(false);
    // set state to hide details
    setShowTimerPopover(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full relative"
    >
      <div
        className={classNames("w-full h-full relative", {
          "cursor-pointer hover:img-highlight": !stage || stage === "ready",
        })}
      >
        {/* Crop base image */}
        <div
          className={
            bumpkinTooLow
              ? "absolute pointer-events-none opacity-50"
              : "absolute pointer-events-none"
          }
          style={{
            width: `${PIXEL_SCALE * 16}px`,
          }}
        >
          <Soil cropName={cropName} stage={stage} />
        </div>
      </div>

      {/* Fertiliser */}
      {fertiliser?.name === "Sprout Mix" && (
        <img
          key={fertiliser.name}
          className="absolute z-10 pointer-events-none"
          src={powerup}
          style={{
            width: `${PIXEL_SCALE * 5}px`,
            bottom: `${PIXEL_SCALE * 9}px`,
            right: `${PIXEL_SCALE * 0}px`,
          }}
        />
      )}
      {fertiliser?.name === "Rapid Root" && (
        <img
          key={fertiliser.name}
          className="absolute z-10 pointer-events-none"
          src={SUNNYSIDE.icons.stopwatch}
          style={{
            width: `${PIXEL_SCALE * 6}px`,
            bottom: `${PIXEL_SCALE * 9}px`,
            right: `${PIXEL_SCALE * 0}px`,
          }}
        />
      )}

      {/* Bumpkin level warning */}
      {showBumpkinLevel && (
        <div
          className="flex justify-center absolute w-full pointer-events-none"
          style={{
            top: `${PIXEL_SCALE * -14}px`,
          }}
        >
          <InnerPanel className="absolute whitespace-nowrap w-fit z-50">
            <div className="text-xxs mx-1 p-1">
              <span>Bumpkin level {bumpkinLevelRequired} required.</span>
            </div>
          </InnerPanel>
        </div>
      )}

      {/* Time popover */}
      {!!cropName && isGrowing && (
        <div
          className="flex justify-center absolute w-full pointer-events-none"
          style={{
            top: `${PIXEL_SCALE * -18}px`,
          }}
        >
          <TimerPopover
            image={ITEM_DETAILS[cropName].image}
            description={cropName}
            showPopover={showTimerPopover}
            timeLeft={timeLeft}
          />
        </div>
      )}

      {/* Health bar for collecting rewards */}
      {!!touchCount && (
        <div
          className="absolute pointer-events-none"
          style={{
            top: `${PIXEL_SCALE * 9}px`,
            width: `${PIXEL_SCALE * 15}px`,
          }}
        >
          <Bar percentage={100 - touchCount * 50} type="health" />
        </div>
      )}

      {/* Progres bar for growing crops */}
      {showTimers && isGrowing && (
        <div
          className="absolute pointer-events-none"
          style={{
            top: `${PIXEL_SCALE * 9}px`,
            width: `${PIXEL_SCALE * 15}px`,
          }}
        >
          <LiveProgressBar
            key={`${startAt}-${readyAt}`}
            startAt={startAt}
            endAt={readyAt}
            formatLength="short"
            onComplete={() => setRender((r) => r + 1)}
          />
        </div>
      )}

      {/* Firework animation */}
      {procAnimation}
    </div>
  );
};

export const FertilePlot = React.memo(FertilePlotComponent);
