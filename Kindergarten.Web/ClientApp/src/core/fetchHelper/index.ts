export const parseData = <T>(data: T) => JSON.parse(data as any as string) as T;
