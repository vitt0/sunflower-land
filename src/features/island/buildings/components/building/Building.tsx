import React, { useContext, useState } from "react";

import { BuildingName } from "features/game/types/buildings";
import { Bar } from "components/ui/ProgressBar";
import { TimeLeftPanel } from "components/ui/TimeLeftPanel";
import useUiRefresher from "lib/utils/hooks/useUiRefresher";
import { PIXEL_SCALE } from "features/game/lib/constants";
import { useSelector } from "@xstate/react";
import { MoveableComponent } from "features/island/collectibles/MovableComponent";
import { MachineState } from "features/game/lib/gameMachine";
import { Context } from "features/game/GameProvider";
import { BUILDING_COMPONENTS, READONLY_BUILDINGS } from "./BuildingComponents";
import { CookableName } from "features/game/types/consumables";

interface Prop {
  name: BuildingName;
  id: string;
  index: number;
  readyAt: number;
  createdAt: number;
  craftingItemName?: CookableName;
  craftingReadyAt?: number;
  showTimers: boolean;
  x: number;
  y: number;
}

export interface BuildingProps {
  buildingId: string;
  buildingIndex: number;
  craftingItemName?: CookableName;
  craftingReadyAt?: number;
  isBuilt?: boolean;
  onRemove?: () => void;
}

const InProgressBuilding: React.FC<Prop> = ({
  name,
  id,
  index,
  readyAt,
  createdAt,
  showTimers,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const BuildingPlaced = BUILDING_COMPONENTS[name];

  const totalSeconds = (readyAt - createdAt) / 1000;
  const secondsLeft = Math.floor((readyAt - Date.now()) / 1000);

  return (
    <>
      <div
        className="w-full h-full"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="w-full h-full pointer-events-none opacity-50">
          <BuildingPlaced buildingId={id} buildingIndex={index} />
        </div>
        {showTimers && (
          <div
            className="absolute bottom-0 left-1/2"
            style={{
              marginLeft: `${PIXEL_SCALE * -8}px`,
            }}
          >
            <Bar
              percentage={(1 - secondsLeft / totalSeconds) * 100}
              type="progress"
            />
          </div>
        )}
      </div>
      <div
        className="flex justify-center absolute w-full pointer-events-none"
        style={{
          top: `${PIXEL_SCALE * -20}px`,
        }}
      >
        <TimeLeftPanel
          text="Ready in:"
          timeLeft={secondsLeft}
          showTimeLeft={showTooltip}
        />
      </div>
    </>
  );
};

const BuildingComponent: React.FC<Prop> = ({
  name,
  id,
  index,
  readyAt,
  createdAt,
  craftingItemName,
  craftingReadyAt,
  showTimers,
  x,
  y,
}) => {
  const BuildingPlaced = BUILDING_COMPONENTS[name];

  const inProgress = readyAt > Date.now();

  useUiRefresher({ active: inProgress });

  return (
    <>
      {inProgress ? (
        <InProgressBuilding
          key={id}
          name={name}
          id={id}
          index={index}
          readyAt={readyAt}
          createdAt={createdAt}
          showTimers={showTimers}
          x={x}
          y={y}
        />
      ) : (
        <BuildingPlaced
          buildingId={id}
          buildingIndex={index}
          craftingItemName={craftingItemName}
          craftingReadyAt={craftingReadyAt}
          isBuilt
        />
      )}
    </>
  );
};

const isLandscaping = (state: MachineState) => state.matches("landscaping");

const MoveableBuilding: React.FC<Prop> = (props) => {
  const { gameService } = useContext(Context);

  const landscaping = useSelector(gameService, isLandscaping);
  if (landscaping) {
    const BuildingPlaced = READONLY_BUILDINGS[props.name];

    const inProgress = props.readyAt > Date.now();

    // In Landscaping mode, use readonly building
    return (
      <MoveableComponent
        id={props.id}
        index={props.index}
        name={props.name}
        x={props.x}
        y={props.y}
      >
        {inProgress ? (
          <BuildingComponent {...props} />
        ) : (
          <BuildingPlaced buildingId={props.id} {...props} />
        )}
      </MoveableComponent>
    );
  }

  return <BuildingComponent {...props} />;
};

export const Building = React.memo(MoveableBuilding);
