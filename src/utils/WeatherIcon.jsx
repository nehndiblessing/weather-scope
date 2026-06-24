import { FaSun, FaCloudSun, FaCloud, FaSmog, FaCloudRain, FaSnowflake, FaBolt, FaQuestion } from "react-icons/fa";

const iconMap = {
  0: FaSun,
  1: FaCloudSun,
  2: FaCloudSun,
  3: FaCloud,
  45: FaSmog,
  48: FaSmog,
  51: FaCloudRain,
  61: FaCloudRain,
  63: FaCloudRain,
  65: FaCloudRain,
  71: FaSnowflake,
  95: FaBolt,
};

export default function WeatherIcon({ code, className = "text-5xl" }) {
  const Icon = iconMap[code] || FaQuestion;
  return <Icon className={className} />;
}
