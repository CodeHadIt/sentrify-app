export const cleanseParam = (str: string): string => {
    const newStr = (str = str
      .replace(/&/g, ":")
      .replace(/\$/g, "/")
      .replace(/\*/g, "."));

    return newStr;
}