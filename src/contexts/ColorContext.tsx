import React, { createContext, useContext, useEffect, useState } from "react";

export type IColorContext = {
  getHSL: (color: string, opacity: number) => string;
};

export const ColorContext = createContext<Partial<IColorContext>>({});

export const useColor = () => {
  return useContext(ColorContext);
};

export const ColorProvider: React.FC = ({ children }) => {
  const [colors, setColors] = useState<Colors>({});

  useEffect(() => {
    console.log("Getting all CSS colors");

    let colors: Colors = {};

    const styles = [].slice
      .call(document.styleSheets)
      .map((styleSheet: CSSStyleSheet) => [].slice.call(styleSheet.cssRules))
      .flat()
      .filter((cssRule: CSSStyleRule) => cssRule.selectorText === ":root")
      .map((cssRule: CSSRule) => cssRule.cssText.split("{")[1].split("}")[0].trim().split(";"))
      .flat()
      .filter((text: string) => text.includes("--clr"))
      .map(text => text.split(":"))
      .filter(parts => parts[0].includes("--clr"))
      .forEach(parts => {
        const key = parts[0].trim().replace("--clr-", "");
        const value = parts[1].trim();

        colors[key] = value;
      });

    console.log(colors);

    setColors(colors);
  }, []);

  const getHSL = (color: string, opacity: number = 1): string => {
    return `hsl(${colors[color]} / ${opacity})`;
  };

  const value: IColorContext = {
    getHSL,
  };

  return <ColorContext.Provider value={value}>{children}</ColorContext.Provider>;
};

type Colors = {
  [color: string]: any;
};
