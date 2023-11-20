import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "@xstate/react";

import Spritesheet, {
  SpriteSheetInstance,
} from "components/animation/SpriteAnimator";

import strikeSheet from "assets/resources/gold/gold_rock_spark.png";

import { PIXEL_SCALE } from "features/game/lib/constants";

import { Bar } from "components/ui/ProgressBar";
import { InnerPanel } from "components/ui/Panel";
import classNames from "classnames";
import { miningAudio } from "lib/utils/sfx";
import gold from "assets/resources/gold_small.png";
import { ZoomContext } from "components/ZoomProvider";

import { MachineState } from "features/game/lib/gameMachine";
import { Context } from "features/game/GameProvider";
import { getBumpkinLevel } from "features/game/lib/level";

const tool = "Iron Pickaxe";

const STRIKE_SHEET_FRAME_WIDTH = 112;
const STRIKE_SHEET_FRAME_HEIGHT = 48;

const _bumpkinLevel = (state: MachineState) =>
  getBumpkinLevel(state.context.state.bumpkin?.experience ?? 0);

interface Props {
  bumpkinLevelRequired: number;
  hasTool: boolean;
  touchCount: number;
}

const RecoveredGoldComponent: React.FC<Props> = ({
  bumpkinLevelRequired,
  hasTool,
  touchCount,
}) => {
  const { scale } = useContext(ZoomContext);
  const [showSpritesheet, setShowSpritesheet] = useState(false);
  const [showEquipTool, setShowEquipTool] = useState(false);
  const [showBumpkinLevel, setShowBumpkinLevel] = useState(false);

  const strikeGif = useRef<SpriteSheetInstance>();

  // prevent performing react state update on an unmounted component
  useEffect(() => {
    return () => {
      strikeGif.current = undefined;
    };
  }, []);

  const { gameService } = useContext(Context);
  const bumpkinLevel = useSelector(gameService, _bumpkinLevel);
  const bumpkinTooLow = bumpkinLevel < bumpkinLevelRequired;

  useEffect(() => {
    if (bumpkinTooLow) return;
    if (touchCount > 0) {
      setShowSpritesheet(true);
      miningAudio.play();
      strikeGif.current?.goToAndPlay(0);
    }
  }, [touchCount]);

  const handleHover = () => {
    if (bumpkinTooLow) {
      setShowBumpkinLevel(true);
      return;
    }
    if (!hasTool) {
      setShowEquipTool(true);
    }
  };

  const handleMouseLeave = () => {
    setShowBumpkinLevel(false);
    setShowEquipTool(false);
  };

  return (
    <div
      className="absolute w-full h-full"
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      {/* Uncollected resource node which is collectable */}
      <div
        className={classNames("absolute w-full h-full", {
          "cursor-pointer hover:img-highlight": !showEquipTool,
          "cursor-not-allowed": showEquipTool,
        })}
      >
        {/* static resource node image */}
        {!showSpritesheet && (
          <img
            src={gold}
            className={
              bumpkinTooLow
                ? "absolute pointer-events-none opacity-50"
                : "absolute pointer-events-none"
            }
            style={{
              width: `${PIXEL_SCALE * 14}px`,
              bottom: `${PIXEL_SCALE * 3}px`,
              right: `${PIXEL_SCALE * 1}px`,
            }}
          />
        )}

        {/* spritesheet */}
        {showSpritesheet && (
          <Spritesheet
            className="pointer-events-none"
            style={{
              position: "absolute",
              width: `${STRIKE_SHEET_FRAME_WIDTH * PIXEL_SCALE}px`,
              height: `${STRIKE_SHEET_FRAME_HEIGHT * PIXEL_SCALE}px`,
              imageRendering: "pixelated",

              // Adjust the base of resource node to be perfectly aligned to
              // on a grid point.
              bottom: `${PIXEL_SCALE * -13}px`,
              right: `${PIXEL_SCALE * -63}px`,
            }}
            getInstance={(spritesheet) => {
              strikeGif.current = spritesheet;
              spritesheet.goToAndPlay(0);
            }}
            image={strikeSheet}
            widthFrame={STRIKE_SHEET_FRAME_WIDTH}
            heightFrame={STRIKE_SHEET_FRAME_HEIGHT}
            zoomScale={scale}
            fps={24}
            steps={6}
            direction={`forward`}
            autoplay={false}
            loop={true}
            onLoopComplete={(spritesheet) => {
              spritesheet.pause();
              if (touchCount == 0 && !!strikeGif.current) {
                setShowSpritesheet(false);
              }
            }}
          />
        )}
      </div>

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

      {/* No tool warning */}
      {showEquipTool && (
        <div
          className="flex justify-center absolute w-full pointer-events-none"
          style={{
            top: `${PIXEL_SCALE * -14}px`,
          }}
        >
          <InnerPanel className="absolute whitespace-nowrap w-fit z-50">
            <div className="text-xxs mx-1 p-1">
              <span>Equip {tool.toLowerCase()}</span>
            </div>
          </InnerPanel>
        </div>
      )}

      {/* Health bar */}
      {touchCount > 0 && (
        <div
          className="absolute left-1/2 pointer-events-none"
          style={{
            marginLeft: `${PIXEL_SCALE * -8}px`,
            bottom: `${PIXEL_SCALE * -5}px`,
          }}
        >
          <Bar percentage={100 - (touchCount / 3) * 100} type="health" />
        </div>
      )}
    </div>
  );
};

export const RecoveredGold = React.memo(RecoveredGoldComponent);
