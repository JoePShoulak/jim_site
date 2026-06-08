const measurementId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

let initialized = false;

const canUseAnalytics = () =>
  Boolean(measurementId) && typeof window !== "undefined";

export const initAnalytics = () => {
  if (!canUseAnalytics() || initialized) {
    return;
  }

  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      window.dataLayer.push(arguments);
    };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });
};

export const trackPageView = ({ path, title }) => {
  if (!canUseAnalytics()) {
    return;
  }

  initAnalytics();

  window.gtag("config", measurementId, {
    page_path: path,
    page_title: title,
  });
};
