import { useEffect, useState, useRef } from "react";

import "./feature.scss";

import FeatureImgOne from "../../src/assets/Images/featureImgOne.png";
import FeatureImgTwo from "../../src//assets/Images/featureImgTwo.png";
import FeatureImgThree from "../../src/assets/Images/featureImgThree.png";
import FeatureImgFour from "../../src/assets/Images/featureImgFour.png";

function Features() {
  const [featureTabs, setFeatureTabs] = useState(0);
  const [featuresContentBox, setFeaturesContentBox] = useState(0);
  const [tabHeight, setTabHeight] = useState(0);
  const [headposition, setHeadPosition] = useState(0);
  const sectionRef = useRef(null);
  const ref = useRef(null);
  const refHead = useRef(null);

  function debounce(func, timeout = 80) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const processChange = debounce((e) => handleWheel(e));
  const handleWheel = (event) => {
    const height = ref.current.clientHeight;
    if (window.pageYOffset === 0) {
      setFeatureTabs(100);
    }
    if (event.deltaY > 0 && featureTabs <= 300 && tabHeight < height * 4) {
      setFeatureTabs((prevTabs) => prevTabs + 100);
      setTabHeight((tabHeight) => tabHeight + height);
      window.scrollTo(0, tabHeight + height);
      console.log("height", featureTabs + 100, tabHeight + height);

      if (tabHeight === height * 0) {
        console.log("Completed First", tabHeight + height);
        setFeatureTabs(100);
      } else if (tabHeight === height * 1) {
        console.log("Completed Second", tabHeight + height);
        setFeatureTabs(200);
      } else if (tabHeight === height * 2) {
        console.log("completed Third", tabHeight + height);
        setFeatureTabs(300);
      } else if (tabHeight === height * 3) {
        console.log("completed last", tabHeight + height);
        setFeatureTabs(300);
        window.scrollTo(0, window.pageYOffset);
        setHeadPosition(150);
      }
    } else if (event.deltaY < 0) {
      console.log("event.deltaY", event.deltaY);
      setFeatureTabs((prevTabs) => prevTabs - 100);
      setTabHeight((tabHeight) => tabHeight - height);
      setHeadPosition(0);
      window.scrollTo(0, tabHeight - height);
      console.log("scroll up", featureTabs - 100, tabHeight - height);
    }
  };

  useEffect(() => {
    const height = ref?.current?.clientHeight;
    const headHeight = refHead?.current?.clientHeight;
    const totalHeight = height * 4 + headHeight;
    setFeaturesContentBox(totalHeight);
  }, []);

  useEffect(() => {
    sectionRef?.current?.addEventListener("wheel", processChange);

    return () => {
      sectionRef?.current?.removeEventListener("wheel", processChange);
    };
  }, [tabHeight]);


  return (
    <section
      className="features"
      style={{ height: `${featuresContentBox + 500}px` }}
      ref={sectionRef}
    >
      <div
        className="featuresHeading"
        style={{ transform: `translateY(-${headposition}%)` }}
        ref={refHead}
      >
        <span></span>
        <h2>Features</h2>
        <span></span>
      </div>
      <div className="featuresMainContent">
        <div className="featuresContent">
          <div className="featuresContentList">
            <div
              className="featuresContentBox"
              style={{
                transform: `translateY(-${featureTabs}%)`,
              }}
              ref={ref}
            >
              <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                luctus, nisi a tempor faucibus, nunc urna dictum tortor.
              </p>
            </div>
            <div
              className="featuresContentBox"
              style={{
                transform: `translateY(-${featureTabs}%)`,
              }}
            >
              <h3>Customizable Workflow</h3>
              <p>
                Customisable at a factory and specie level workflow for maximum
                information capture, allowing users to capture every step at
                every stage of processing and optimize yield in real-time.
              </p>
            </div>
            <div
              className="featuresContentBox"
              style={{
                transform: `translateY(-${featureTabs}%)`,
              }}
            >
              <h3>Real-Time Status Monitoring</h3>
              <p>
                Monitors the status of individual factory or processor levels
                across multiple lots in real-time, providing complete visibility
                and control over operations.
              </p>
            </div>
            <div
              className="featuresContentBox"
              style={{
                transform: `translateY(-${featureTabs}%)`,
              }}
            >
              <h3>Comprehensive Production Process Tracking</h3>
              <p>
                Designed to help factories track their entire production
                process, from raw fish and seafood procurement to dispatching
                the finished product, providing full traceability and enabling
                data-driven decisions.
              </p>
            </div>
          </div>
          <div className="contentImages">
            <div
              className={`contentImg ${
                featureTabs === 0 ? "activeImg" : ""
              }`}
            >
              <img src={FeatureImgOne} alt="FeatureImgOne" />
            </div>
            <div
              className={`contentImgTwo ${
                featureTabs === 100 ? "active" : ""
              }`}
            >
              <img src={FeatureImgTwo} alt="FeatureImgTwo" />
            </div>
            <div
              className={`contentImgTwo ${
                featureTabs === 200 ? "active" : ""
              }`}
            >
              <img src={FeatureImgThree} alt="FeatureImgThree" />
            </div>
            <div
              className={`contentImgTwo ${
                featureTabs === 300 ? "active" : ""
              }`}
            >
              <img src={FeatureImgFour} alt="FeatureImgFour" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
