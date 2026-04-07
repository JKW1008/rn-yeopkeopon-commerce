export const Images = {
  header: {
    menu: require("@/assets/images/menu.png"),
    logo: require("@/assets/images/logo.png"),
    search: require("@/assets/images/search.png"),
    shoppingBag: require("@/assets/images/shoppingBag.png"),
  },

  home: {
    titleUnderline: require("@/assets/images/titleUnderline.png"),
    brand: {
      boss: require("@/assets/images/home/brands/boss.png"),
      burberry: require("@/assets/images/home/brands/burberry.png"),
      cartier: require("@/assets/images/home/brands/cartier.png"),
      gucci: require("@/assets/images/home/brands/gucci.png"),
      prada: require("@/assets/images/home/brands/prada.png"),
      tiffanyCo: require("@/assets/images/home/brands/tiffanyCo.png"),
    },
    collections: {
      1: require("@/assets/images/home/collections/homeCollection1.png"),
      2: require("@/assets/images/home/collections/homeCollection2.png"),
      video: require("@/assets/images/home/collections/video.png"),
    },
  },
} as const;
