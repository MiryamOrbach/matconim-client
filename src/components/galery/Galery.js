import React, { useEffect, useRef, useState } from "react";
import "./Galery.css";
import ImageDisplay from "./ImageDisplay";
export default function Garlery() {
  const [photos, setPhotos] = useState([
    "shutterstock_2927504.jpg",
    "shutterstock_36808564.jpg",
    "shutterstock_68613892.jpg",
    "shutterstock_73307464.jpg",
    "shutterstock_74622847.jpg",
    "shutterstock_74828464.jpg",
    "shutterstock_74828509.jpg",
    "shutterstock_60949654.jpg",
    "shutterstock_84904912 (1).jpg",
    "shutterstock_48803740.jpg",
    "shutterstock_85029133.jpg",
    "shutterstock_73306213.jpg",
    "shutterstock_85029136.jpg",
    "shutterstock_85029145.jpg",
    "סלט בקערה חסה.jpg",
    "shutterstock_87422474.jpg",
    "shutterstock_91919267.jpg",
    "shutterstock_97186649.jpg",
    "shutterstock_99643229.jpg",
    "shutterstock_101717368.jpg",
    "shutterstock_101954614.jpg",
    "shutterstock_102567683.jpg",
    "shutterstock_102832157.jpg",
    "shutterstock_105988247.jpg",
    "shutterstock_107568407.jpg",
    "shutterstock_108736799.jpg",
    "shutterstock_108761372.jpg",
    "shutterstock_110674913.jpg",
    "shutterstock_110978174.jpg",
    "shutterstock_111132764.jpg",
    "shutterstock_112286855.jpg",
    "shutterstock_115175110.jpg",
    "shutterstock_116670835.jpg",
    "shutterstock_117949834.jpg",
    "shutterstock_121391869.jpg",
    "shutterstock_123360676.jpg",
    "shutterstock_124286533.jpg",
    "shutterstock_126000371.jpg",
    "shutterstock_128153132.jpg",
    "shutterstock_129827573.jpg",
    "shutterstock_137576522.jpg",
    "shutterstock_143708560.jpg",
    "shutterstock_147554894.jpg",
    "shutterstock_162419741.jpg",
    "shutterstock_162419864.jpg",
    "shutterstock_170457659.jpg",
    "shutterstock_182667071.jpg",
    "shutterstock_184790744.jpg",
    "shutterstock_193190252.jpg",
    "shutterstock_194996210.jpg",
    "shutterstock_196101959.jpg",
    "shutterstock_201655142.jpg",
    "shutterstock_225251002.jpg",
    "shutterstock_227211910.jpg",
    "shutterstock_231955507.jpg",
    "shutterstock_232152409.jpg",
    "shutterstock_234246361.jpg",
    "shutterstock_241415734.jpg",
    "shutterstock_257586505.jpg",
    "shutterstock_259052954.jpg",
    "shutterstock_267436511.jpg",
    "shutterstock_267436517.jpg",
    "shutterstock_272679356.jpg",
    "shutterstock_273114215.jpg",
    "shutterstock_298772327.jpg",
    "shutterstock_287254274.jpg",
    "shutterstock_289616693.jpg",
    "shutterstock_290560946.jpg",
    "shutterstock_294403301.jpg",
    "shutterstock_294930032.jpg",
    "shutterstock_300046613.jpg",
    "shutterstock_307683197.jpg",
    "shutterstock_321078182.jpg",
    "shutterstock_324924440.jpg",
    "shutterstock_329921783.jpg",
    "shutterstock_332355233.jpg",
  ]);
  return (
    <div className="images">
      {photos.map((item, idx) => {
        return <ImageDisplay key={idx} item={item} />;
      })}
    </div>
  );
}
