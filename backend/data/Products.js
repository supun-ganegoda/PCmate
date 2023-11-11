const products = [
  {
    name: "MSI B560M PRO-E GAMING MOTHERBOARD",
    image:
      "https://www.sense.lk/images/uploads/product/63246_491_MSI-B560M-PRO-E-1.png",
    description: `Model : TUF GAMING B660M-PLUS D4
      CPU : Intel® Socket LGA1700 for 13th Gen Intel® Core™ & 12th Gen Intel® Core™, Pentium® Gold and Celeron® Processors
      Intel® Socket LGA1700 for 12th Gen Intel® Core™, Pentium® Gold and Celeron® Processors*
      Memory : 4 x DIMM, Max. 128GB, DDR4 5333
      Graphics : 1 x DisplayPort | 1 x HDMI® port
      Storage : Supports 2 x M.2 slots and 4 x SATA 6Gb/s ports
      Total supports 2 x M.2 slots and 4 x SATA 6Gb/s ports*
      Intel® 12th Gen Processors`,
    brand: "ASUS",
    category: "motherboard",
    price: 75120.0,
    countInStock: 5,
    rating: 2.5,
    numReviews: 1,
  },
  {
    name: "ASUS TUF GAMING B660M-PLUS D4 GAMING MOTHERBOARD",
    image:
      "https://www.sense.lk/images/uploads/product/2023/05/202305191543261.png",
    description:
      "ZEB-Reaper is a wireless gaming mouse that comes with a fast polling rate of 500HZ for a lag-free gaming experience. It comes with an advanced optical .",
    brand: "Logitec",
    category: "mouse",
    price: 75120.0,
    countInStock: 2,
    rating: 2.5,
    numReviews: 4,
  },
  {
    name: "GIGABYTE B660M GAMING DDR4 MOTHERBOARD",
    image:
      "https://www.sense.lk/images/uploads/product/62639_706_GIGABYTE-B660M-GAMING-1.png",
    description:
      "Intel® B660 GAMING Motherboard with 6+2+1 Phases Hybrid Digital VRM with MOS Heatsink, 2 x PCIe 4.0 M.2, 2.5GbE LAN, Rear USB 3.2 Gen 1 Type-C®, RGB FUSION 2.0, Q-Flash Plus​​​",
    brand: "GIGABYTE",
    category: "Motherboard",
    price: 49100.0,
    countInStock: 5,
    rating: 1.5,
    numReviews: 3,
  },
  {
    name: "ASUS PRIME Z690-P ",
    image:
      "https://www.sense.lk/images/uploads/product/70951_1212_ASUS-PRIME-Z690-P.png",
    description:
      "Intel® LGA 1700 socket: Ready for 12th gen Intel® processorsEnhanced power solution: 14+1 DrMOS, 8+4 pin ProCool connector, alloy chokes and durable capacitors for stable power delivery",
    brand: "Asus",
    category: "Mother board",
    price: 89000.0,
    countInStock: 5,
    rating: 5,
    numReviews: 10,
  },
  {
    name: "CASING - GAMEMAX G501X",
    image:
      "https://www.sense.lk/images/uploads/product/44334_2602_GAMEMAX-BLACK-DIAMOND.png",
    description:
      "Brand new for 2020 GameMax are proud to introduce the Black Diamond Mid-Tower PC gaming case. Designed with ease of build and finished with a premium aesthetic this case is for those wanting to go to the next level without breaking the bank.",
    brand: "GameMax",
    category: "Casing",
    price: 15000.0,
    countInStock: 5,
    rating: 4.5,
    numReviews: 10,
  },
  {
    name: "MSI RTX 3080 VENTUS 3X PLUS 10G LHR GRAPHIC CARD",
    image:
      "https://www.sense.lk/images/uploads/product/68926_220_MSI-RTX-3080-VENTUS-3X-PLUS-10G-OC-LHR-1.png",
    description: `GeForce RTX™ 3080 VENTUS 3X PLUS 10G LHR
      The GeForce RTX™ 3080 delivers the ultra-performance that gamers crave, powered by Ampere—NVIDIA’s 2nd gen RTX architecture. It’s built with enhanced RT Cores and Tensor Cores, new streaming multiprocessors, and superfast G6X memory for an amazing gaming experience.
      This GeForce RTX 3080 graphics card with LHR (lite hash rate) delivers 43 MH/s ETH hash rate (est.).`,
    brand: "MSI",
    category: "Graphics Card",
    price: 375000.0,
    countInStock: 2,
    rating: 2.5,
    numReviews: 3,
  },
  {
    name: "MSI RADEON RX 6500 XT MECH 2X 4G OC GRAPHIC CARD",
    image:
      "https://www.sense.lk/images/uploads/product/68939_209_MSI-RADEON-RX-6500-XT-MECH-1.png",
    description: `Impressive 1080p gaming performance and boosted frame rates with AMD FidelityFX™ Super Resolution technology. The MSI Radeon™ RX 6500 XT graphics cards, featuring the breakthrough AMD RDNA™ 2 architecture and engineered to deliver great gaming performance with remarkable efficiency. Blaze a trail into tomorrow, dive into 1080P gaming, enjoy vivid virtual worlds, and elevated experiences with the power of next-generation graphics.`,
    brand: "MSI",
    category: "Graphics Card",
    price: 110000.0,
    countInStock: 4,
    rating: 3.5,
    numReviews: 3,
  },
  {
    name: "POWER SUPPLY - GAMEMAX GM-500G",
    image:
      "https://www.sense.lk/images/uploads/product/39976_5033_PO1GAM0015-1.png",
    description: `GameMax Semi-Modular Series is a semi-Modular PSU with a compact and quiet engineering, with semi-modular cables for easy maintenance, allowing you to only connect cables that your system needs. Fewer cables allows it to be tidy and better airflow inside your case. High 80 Plus efficiency, reduced ripple and electrical instabilities and better efficiency and protection gives the user durability and total confidence in your next system build. 100% 6th Generation Skylake Ready!`,
    brand: "GameMax",
    category: "Power Supply",
    price: 20600.0,
    countInStock: 6,
    rating: 2.5,
    numReviews: 0,
  },
  {
    name: "MICROPACK GC-30 COMBO GAMING KEYBOARD",
    image:
      "https://www.sense.lk/images/uploads/product/2023/07/202307131148441%20(1).png",
    description: `Sensor : Professional optical sensor
    Resolution : 800-1200-1600 DPI
    Numbers of buttons : 4 (left key, right key, scroll, DPI switch)
    Interface : USB2.0    
    LED : Rainbow breathing LED
    Dimension : 125x66x40 mm
    Multimedia Key : 18`,
    brand: "Micro Pack",
    category: "Key board",
    price: 5600.0,
    countInStock: 8,
    rating: 3.0,
    numReviews: 0,
  },
];
export default products;
