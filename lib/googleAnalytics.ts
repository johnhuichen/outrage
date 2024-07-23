export const GA_TRACKING_ID = process.env.NEXT_GA_TRACKING_ID as string;

export const gTagEvent = (name: string, eventParams: Record<string, any>) => {
  window.gtag("event", name, eventParams);
};
