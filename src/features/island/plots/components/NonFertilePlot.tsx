import React, { useState } from "react";

import well from "assets/buildings/well1.png";

import { PIXEL_SCALE } from "features/game/lib/constants";
import { Modal } from "react-bootstrap";
import { SUNNYSIDE } from "assets/sunnyside";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { InnerPanel } from "components/ui/Panel";

const NonFertilePlotComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showWaterWell, setShowWaterWell] = useState(false);

  const handleHover = () => {
    setShowWaterWell(true);
  };

  const handleMouseLeave = () => {
    setShowWaterWell(false);
  };

  return (
    <>
      <div
        className="w-full h-full relative cursor-pointer hover:img-highlight"
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={SUNNYSIDE.soil.soil_dry}
          alt="soil image"
          className="absolute"
          style={{
            top: `${PIXEL_SCALE * 2}px`,
            width: `${PIXEL_SCALE * 16}px`,
          }}
          onClick={() => setShowModal(true)}
        />
      </div>

      {/* Water Well warning */}
      {showWaterWell && (
        <div
          className="flex justify-center absolute w-full pointer-events-none"
          style={{
            top: `${PIXEL_SCALE * -14}px`,
          }}
        >
          <InnerPanel className="absolute whitespace-nowrap w-fit z-50">
            <div className="text-xxs mx-1 p-1">
              <span>Additional Water Well required.</span>
            </div>
          </InnerPanel>
        </div>
      )}

      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <CloseButtonPanel
          title="These crops need water!"
          onClose={() => setShowModal(false)}
        >
          <div className="p-2">
            In order to support more crops, build a well.
            <img
              src={well}
              alt="well"
              width={PIXEL_SCALE * 25}
              className="mx-auto mt-4 mb-2"
            />
          </div>
        </CloseButtonPanel>
      </Modal>
    </>
  );
};

export const NonFertilePlot = React.memo(NonFertilePlotComponent);
