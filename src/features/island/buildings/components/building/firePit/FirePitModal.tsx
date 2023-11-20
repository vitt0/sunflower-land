import React, { useState } from "react";

import { Modal } from "react-bootstrap";
import { getKeys } from "features/game/types/craftables";

import chefHat from "src/assets/icons/chef_hat.png";

import { Recipes } from "../../ui/Recipes";
import {
  Cookable,
  CookableName,
  COOKABLES,
} from "features/game/types/consumables";
import { MachineInterpreter } from "features/island/buildings/lib/craftingMachine";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { ConversationName } from "features/game/types/conversations";
import { Panel } from "components/ui/Panel";
import { NPC_WEARABLES } from "lib/npcs";
import { SpeakingText } from "features/game/components/SpeakingModal";
import { useAppTranslation } from "lib/i18n/useAppTranslations";

const host = window.location.host.replace(/^www\./, "");
const LOCAL_STORAGE_KEY = `bruce-read.${host}-${window.location.pathname}`;

function acknowledgeRead() {
  localStorage.setItem(LOCAL_STORAGE_KEY, new Date().toString());
}

function hasRead() {
  return !!localStorage.getItem(LOCAL_STORAGE_KEY);
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCook: (name: CookableName) => void;
  crafting: boolean;
  itemInProgress?: CookableName;
  craftingService?: MachineInterpreter;
  conversation?: ConversationName;
}
export const FirePitModal: React.FC<Props> = ({
  isOpen,
  onCook,
  onClose,
  crafting,
  itemInProgress,
  craftingService,
  conversation,
}) => {
  const [showIntro, setShowIntro] = React.useState(!hasRead());
  const { t } = useAppTranslation();
  const firePitRecipes = getKeys(COOKABLES).reduce((acc, name) => {
    if (COOKABLES[name].building !== "Fire Pit") {
      return acc;
    }

    return [...acc, COOKABLES[name]];
  }, [] as Cookable[]);
  const [selected, setSelected] = useState<Cookable>(
    firePitRecipes.find((recipe) => recipe.name === itemInProgress) ||
      firePitRecipes[0]
  );

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      {showIntro && (
        <Panel bumpkinParts={NPC_WEARABLES.bruce}>
          <SpeakingText
            message={[
              {
                text: t("bruce-intro.three"),
              },
              {
                text: t("bruce-intro.two"),
              },
            ]}
            onClose={() => {
              acknowledgeRead();
              setShowIntro(false);
            }}
          />
        </Panel>
      )}

      {!showIntro && (
        <CloseButtonPanel
          tabs={[{ icon: chefHat, name: "Fire Pit" }]}
          onClose={onClose}
          bumpkinParts={NPC_WEARABLES.bruce}
        >
          <Recipes
            selected={selected}
            setSelected={setSelected}
            recipes={firePitRecipes}
            onCook={onCook}
            onClose={onClose}
            crafting={!!crafting}
            craftingService={craftingService}
          />
        </CloseButtonPanel>
      )}
    </Modal>
  );
};
