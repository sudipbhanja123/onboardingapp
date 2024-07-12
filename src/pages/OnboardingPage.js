import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OnboardingPage = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const contentArray = [
    {
      title: "We serve incomparable delicacies",
      description:
        "All the best restaurants with their top menu waiting for you, they can't wait for your order!",
      backgroundImage:
        "url('https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg')",
    },
    {
      title: "We serve incomparable delicacies",
      description:
        "All the best restaurants with their top menu waiting for you, they can't wait for your order!",
      backgroundImage:
        "url('https://static.toiimg.com/thumb/83565509.cms?width=1200&height=900')",
    },
    {
      title: "We serve incomparable delicacies",
      description:
        "All the best restaurants with their top menu waiting for you, they can't wait for your order!",
      backgroundImage:
        "url('https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg')",
    },
  ];

  const handleSlider = () => {
    if (count < contentArray.length - 1) {
      setCount(count + 1);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${count * 100}%)` }}
      >
        {contentArray.map((content, index) => (
          <div
            key={index}
            className="min-h-screen flex bg-cover bg-center flex-shrink-0 w-full"
            style={{
              backgroundImage: content.backgroundImage,
            }}
          >
            <div className="flex justify-center items-center w-full">
              <div className="bg-primeryBtn text-white rounded-3xl max-w-xs mx-auto text-center p-10 mt-auto mb-20 h-[450px]">
                <h1 className="text-3xl mb-2 font-semibold">{content.title}</h1>
                <p className="mb-4 mt-10">{content.description}</p>
                <div className="flex items-center indicator justify-center">
                  {contentArray.map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-6 h-[6px] bg-white rounded-full mx-1 ${
                        count === idx ? "opacity-100" : "opacity-50"
                      }`}
                    ></span>
                  ))}
                </div>

                <div
                  className={`${
                    count === 2 ? "flex" : "hidden"
                  } items-center justify-center mt-10`}
                >
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="relative flex items-center justify-center w-24 h-24 bg-orange-500 rounded-full"
                  >
                    <div className="absolute flex items-center justify-center w-20 h-20 bg-white rounded-full">
                      <FaArrowRight className="text-orange-500" />
                    </div>
                  </button>
                </div>

                <div
                  className={`${
                    count !== 2 ? "flex" : "hidden"
                  } justify-between items-center mt-28`}
                >
                  <button
                    className="text-sm"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Skip
                  </button>
                  <button
                    onClick={handleSlider}
                    className="text-sm flex items-center justify-center"
                  >
                    Next{" "}
                    <span>
                      <FaArrowRight />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnboardingPage;
