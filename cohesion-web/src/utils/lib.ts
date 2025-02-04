import { v4 as uuidv4 } from "uuid";

export const _getUUID = () => {
  return uuidv4();
};

export const _copyContent = async (content: string) => {
  await navigator.clipboard.writeText(content);
};
