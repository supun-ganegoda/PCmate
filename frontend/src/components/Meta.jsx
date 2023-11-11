import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to PCmate",
  description: "Buy the best computer parts at a cheap price",
  keywords: "computer, ram, hardware, cpu, gpu, vga, casing, power supply",
};

export default Meta;
