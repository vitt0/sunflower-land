import React from "react";

import { setImageWidth } from "lib/images";
import { useAppTranslation } from "lib/i18n/useAppTranslations";

interface Props {
  icon: string;
}

export const Revealing: React.FC<Props> = ({ icon }) => {
  const { t } = useAppTranslation();
  return (
    <div className="flex flex-col items-center p-2">
      <span className="text-center mb-2">{t("reward.revealing")}</span>
      <img
        src={icon}
        alt="digging"
        className="my-2"
        onLoad={(e) => setImageWidth(e.currentTarget)}
      />
      <span
        className="text-center text-xs loading mb-1"
        style={{
          height: "24px",
        }}
      >
        {t("loading")}
      </span>
    </div>
  );
};
