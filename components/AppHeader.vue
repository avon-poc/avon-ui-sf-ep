<template>
  <div class="header-block">
    <div class="header-avon smartphone-only">
      <div class="topbar">
        <nav>
          <div class="mobile-menu">
            <div
              @click="() => toggleMenu()"
              v-bind:class="{ closeMenu: menuOpen }"
            >
              <span></span>
              <span></span>
              <span></span>
              <small>MENU</small>
            </div>
            <aside
              class="smartphone-only"
              v-bind:style="{ left: menuLeftPosition }"
            >
              <div class="top_navigation">
                <ul class="mobNav" id="nav">
                  <li
                    class="mobNav__parent"
                    v-for="(category, index) in categoryList"
                    :key="category.id"
                    @click="(e) => toggleSubMenu(e)"
                  >
                    {{ category.name }}
                    <SfIcon
                      icon="chevron_right"
                      class="chevron_right"
                      size="xxs"
                      color="grey"
                      viewBox="0 0 24 24"
                      :coverage="1"
                    />
                    <ul class="mobNav__child" :class="`child-${index}`">
                      <p>
                        <SfIcon
                          icon="chevron_left"
                          class="chevron_left"
                          size="xxs"
                          color="grey"
                          viewBox="0 0 24 24"
                          :coverage="1"
                        />{{ category.name }}
                      </p>
                      <li>
                        <a :href="'/c/' + category.slug">
                          All {{ category.name }}</a
                        >
                      </li>
                      <li v-for="subCat in category.children" :key="subCat.id">
                        <a :href="'/c/' + category.slug + '/' + subCat.slug">{{
                          subCat.name
                        }}</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="top_navigation_desk" v-if="!subMenuToggle">
                <a
                  v-for="category in topNavigation"
                  :href="'/c/' + category.slug"
                  :key="category.id"
                  >{{ category.name }}
                </a>
              </div>
            </aside>
          </div>
        </nav>
        <div class="logo">
          <nuxt-link
            data-cy="app-header-url_logo"
            :to="localePath('/')"
            class="sf-header__logo"
          >
            <SfImage
              src="/homepage/logo.png"
              alt="Vue Storefront Next"
              class="sf-header__logo-image"
            />
          </nuxt-link>
        </div>
        <div class="account-block">
          <div class="account">
            <svg viewBox="0 0 23.8 29.5" id="Svg_avatar-user">
              <path
                d="m 0,29.48381 c 0,0 0.39974,-11.36425 4.04061,-14.39467 4.90355,4.60886 9.16066,4.7208 14.83661,-10e-6 3.65566,3.10787 4.86136,14.39468 4.86136,14.39468 z"
                fill="currentColor"
              ></path>
              <ellipse
                cx="11.553617"
                cy="7.8760314"
                rx="7.9549513"
                ry="7.8760333"
                fill="currentColor"
              ></ellipse>
            </svg>
          </div>
          <div class="cart-bag" @click="routeCart">
            <svg viewBox="0 0 21 21" id="Svg_bag">
              <path
                fill="currentColor"
                d="m 1.573013,0.95981479 17.995268,0 0,2.45390021 1.289871,0.7865065 -0.03146,14.4087985 c -0.214975,0.747788 -0.472995,1.289367 -1.761774,1.541553 l -16.9885398,0 C 1.0964915,20.037816 0.37578471,19.618757 0.31460259,18.420259 l 0,-14.282958 1.22695011,-0.6292052 z"
              ></path>
              <circle
                r="1.2898706"
                cy="7.3147874"
                cx="6.04037"
                class="whiteFill"
                style="
                  fill: #ffffff;
                  stroke-width: 1px;
                  stroke-linecap: butt;
                  stroke-linejoin: miter;
                  stroke-opacity: 1;
                "
              ></circle>
              <circle
                class="whiteFill"
                style="
                  fill: #ffffff;
                  fill-opacity: 1;
                  fill-rule: evenodd;
                  stroke: none;
                  stroke-width: 1px;
                  stroke-linecap: butt;
                  stroke-linejoin: miter;
                  stroke-opacity: 1;
                "
                cx="14.975083"
                cy="7.3147874"
                r="1.2898706"
              ></circle>
              <path
                d="m 6.6381147,8.4473566 c -0.029178,3.6032694 2.146418,4.6204984 4.0326393,4.6375324 1.86741,0.01686 3.659503,-1.470167 3.769505,-4.700453 l 1.25841,-0.125841 c -0.09959,4.565509 -2.467711,6.106906 -5.128022,6.10329 C 6.8231278,14.320164 5.3929038,11.946652 5.4111646,8.2271347 Z"
                style="
                  fill: #ffffff;
                  fill-opacity: 1;
                  fill-rule: evenodd;
                  stroke: none;
                  stroke-width: 1px;
                  stroke-linecap: butt;
                  stroke-linejoin: miter;
                  stroke-opacity: 1;
                "
                class="whiteFill"
              ></path>
              <path
                d="m 2.9258041,2.1867649 15.2267659,0 -1.22695,1.2584104 0.471903,0.5977449 -13.7481329,0 0.5033641,-0.5977449 z"
                style="
                  fill: #ffffff;
                  fill-rule: evenodd;
                  stroke: none;
                  stroke-width: 1px;
                  stroke-linecap: butt;
                  stroke-linejoin: miter;
                  stroke-opacity: 1;
                  fill-opacity: 1;
                "
                class="whiteFill"
              ></path>
            </svg>
            <span class="cart-count" v-if="cartTotalItems">{{
              cartTotalItems
            }}</span>
          </div>
        </div>
      </div>
      <div class="seperator-avon"></div>
      <SfSearchBar
        ref="searchBarRef"
        :placeholder="$t('Search for products')"
        aria-label="Search"
        class="sf-header__search"
        :value="term"
        v-on:keyup.enter="handleSearch($event)"
        v-click-outside="closeSearch"
      >
        <template #icon>
          <SfButton
            v-if="!!term"
            class="sf-search-bar__button sf-button--pure"
            @click="closeOrFocusSearchBar"
          >
            <span class="sf-search-bar_ _icon">
              <SfIcon color="var(--c-text)" size="18px" icon="cross" />
            </span>
          </SfButton>
          <SfButton
            v-else
            class="sf-search-bar__button sf-button--pure"
            @click="
              isSearchOpen ? (isSearchOpen = false) : (isSearchOpen = true)
            "
          >
            <span class="sf-search-bar__icon">
              <SfIcon color="var(--c-text)" size="20px" icon="search" />
            </span>
          </SfButton>
        </template>
      </SfSearchBar>
    </div>
    <div class="desktop-only main_Wrapper">
      <SfHeader
        data-cy="app-header"
        class="sf-header--has-mobile-search"
        :class="{ 'header-on-top': isSearchOpen }"
      >
        <!-- TODO: add mobile view buttons after SFUI team PR -->
        <template #logo>
          <nuxt-link
            data-cy="app-header-url_logo"
            :to="localePath('/')"
            class="sf-header__logo"
          >
            <SfImage
              src="/homepage/logo.png"
              alt="Vue Storefront Next"
              class="sf-header__logo-image shine"
            />
          </nuxt-link>
        </template>
        <template #navigation>
          <!--  <SfHeaderNavigationItem class="nav-item" data-cy="app-header-url_women" label="WOMEN" :link="localePath('/c/women')"/>
        <SfHeaderNavigationItem class="nav-item"  data-cy="app-header-url_men" label="MEN" :link="localePath('/c/men')" />-->
        </template>
        <template #aside>
          <LocaleSelector class="smartphone-only" />
        </template>
        <template #header-icons>
          <div class="sf-header__icons">
            <!-- <SfButton
              class="sf-button--pure sf-header__action"
              @click="handleAccountClick"
            >
              <SfIcon :icon="accountIcon" size="1.25rem" />
            </SfButton> -->
            <SfButton
              class="sf-button--pure sf-header__action wishlistHeader"
              @click="toggleWishlistSidebar"
            >
              <SfIcon class="sf-header__icon" icon="heart" size="0.8rem" />
              Wishlist
            </SfButton>
            <SfButton
              class="sf-button--pure sf-header__action"
              @click="toggleCartSidebar"
            >
              <!-- <SfIcon
                class="sf-header__icon"
                icon="empty_cart"
                size="1.25rem"
              /> -->
              <div class="miniCart">
                <svg viewBox="0 0 21 21" id="Svg_bag">
                  <path
                    fill="currentColor"
                    d="m 1.573013,0.95981479 17.995268,0 0,2.45390021 1.289871,0.7865065 -0.03146,14.4087985 c -0.214975,0.747788 -0.472995,1.289367 -1.761774,1.541553 l -16.9885398,0 C 1.0964915,20.037816 0.37578471,19.618757 0.31460259,18.420259 l 0,-14.282958 1.22695011,-0.6292052 z"
                  ></path>
                  <circle
                    r="1.2898706"
                    cy="7.3147874"
                    cx="6.04037"
                    class="whiteFill"
                    style="
                      fill: #ffffff;
                      stroke-width: 1px;
                      stroke-linecap: butt;
                      stroke-linejoin: miter;
                      stroke-opacity: 1;
                    "
                  ></circle>
                  <circle
                    class="whiteFill"
                    style="
                      fill: #ffffff;
                      fill-opacity: 1;
                      fill-rule: evenodd;
                      stroke: none;
                      stroke-width: 1px;
                      stroke-linecap: butt;
                      stroke-linejoin: miter;
                      stroke-opacity: 1;
                    "
                    cx="14.975083"
                    cy="7.3147874"
                    r="1.2898706"
                  ></circle>
                  <path
                    d="m 6.6381147,8.4473566 c -0.029178,3.6032694 2.146418,4.6204984 4.0326393,4.6375324 1.86741,0.01686 3.659503,-1.470167 3.769505,-4.700453 l 1.25841,-0.125841 c -0.09959,4.565509 -2.467711,6.106906 -5.128022,6.10329 C 6.8231278,14.320164 5.3929038,11.946652 5.4111646,8.2271347 Z"
                    style="
                      fill: #ffffff;
                      fill-opacity: 1;
                      fill-rule: evenodd;
                      stroke: none;
                      stroke-width: 1px;
                      stroke-linecap: butt;
                      stroke-linejoin: miter;
                      stroke-opacity: 1;
                    "
                    class="whiteFill"
                  ></path>
                  <path
                    d="m 2.9258041,2.1867649 15.2267659,0 -1.22695,1.2584104 0.471903,0.5977449 -13.7481329,0 0.5033641,-0.5977449 z"
                    style="
                      fill: #ffffff;
                      fill-rule: evenodd;
                      stroke: none;
                      stroke-width: 1px;
                      stroke-linecap: butt;
                      stroke-linejoin: miter;
                      stroke-opacity: 1;
                      fill-opacity: 1;
                    "
                    class="whiteFill"
                  ></path>
                </svg>
                <span class="cart-count" v-if="cartTotalItems"
                  >({{ cartTotalItems }})</span
                >
                <span class="cart-count" v-else>(0)</span>
                Shopping Bag
              </div>
              <SfBadge
                v-if="cartTotalItems"
                class="sf-badge--number cart-badge"
                >{{ cartTotalItems }}</SfBadge
              >
            </SfButton>
          </div>
        </template>
        <template #search>
          <SfSearchBar
            ref="searchBarRef"
            :placeholder="$t('Search for products')"
            aria-label="Search"
            class="sf-header__search"
            :value="term"
            v-on:keyup.enter="handleSearch($event)"
            v-click-outside="closeSearch"
          >
            <template #icon>
              <SfButton
                v-if="!!term"
                class="sf-search-bar__button sf-button--pure"
                @click="closeOrFocusSearchBar"
              >
                <span class="sf-search-bar_ _icon">
                  <SfIcon color="var(--c-text)" size="18px" icon="cross" />
                </span>
              </SfButton>
              <SfButton
                v-else
                class="sf-search-bar__button sf-button--pure"
                @click="
                  isSearchOpen ? (isSearchOpen = false) : (isSearchOpen = true)
                "
              >
                <span class="sf-search-bar__icon">
                  <SfIcon color="var(--c-text)" size="20px" icon="search" />
                </span>
              </SfButton>
            </template>
          </SfSearchBar>
        </template>
      </SfHeader>
      <div class="top_navigation_desk">
        <a
          v-for="category in topNavigation"
          :href="'/' + category.slug"
          :key="category.id"
          >{{ category.name }}</a
        >
      </div>
      <div class="category_navigation">
        <ul>
          <li v-for="(category, index) in categoryList" :key="category.id">
            <a :href="'/c/' + category.slug">{{ category.name }}</a>
            <ul class="subCat" :class="`child-${index}`">
              <li v-for="subCat in category.children" :key="subCat.id">
                <a :href="'/c/' + category.slug + '/' + subCat.slug">{{
                  subCat.name
                }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <SearchResults
        :visible="isSearchOpen"
        :result="result"
        @close="closeSearch"
      />
      <SfOverlay :visible="isSearchOpen" />
    </div>
  </div>
</template>

<script>
import {
  SfImage,
  SfIcon,
  SfButton,
  SfBadge,
  SfSearchBar,
  SfOverlay,
  SfHeader,
} from "@storefront-ui/vue";
import { useUiState } from "~/composables";
import {
  useCart,
  useWishlist,
  useUser,
  cartGetters,
  useFacet,
  useCategory,
} from "@vue-storefront/commercetools";
import {
  computed,
  ref,
  onBeforeUnmount,
  watch,
  onMounted,
} from "@vue/composition-api";
import { onSSR } from "@vue-storefront/core";
import { useUiHelpers } from "~/composables";
import LocaleSelector from "./LocaleSelector";
import SearchResults from "~/components/SearchResults";
import { clickOutside } from "@storefront-ui/vue/src/utilities/directives/click-outside/click-outside-directive.js";
import {
  mapMobileObserver,
  unMapMobileObserver,
} from "@storefront-ui/vue/src/utilities/mobile-observer.js";
import debounce from "lodash.debounce";
export default {
  components: {
    SfImage,
    LocaleSelector,
    SfIcon,
    SfButton,
    SfBadge,
    SfSearchBar,
    SearchResults,
    SfOverlay,
    SfHeader,
  },
  directives: { clickOutside },
  setup(props, { root }) {
    process.avon = {
      channelId: "asdfasdf",
    };
    const {
      toggleCartSidebar,
      toggleWishlistSidebar,
      toggleLoginModal,
    } = useUiState();
    const {
      setTermForUrl,
      getFacetsFromURL,
      getSearchTermFromUrl,
    } = useUiHelpers();
    let menuLeftPosition = ref("-1000px");
    let menuOpen = ref(false);
    const subMenuToggle = ref(false);
    const { result, search } = useFacet();
    const { isAuthenticated, load: loadUser } = useUser();
    const { cart, load: loadCart } = useCart();
    const { load: loadWishlist } = useWishlist();
    const term = ref(getFacetsFromURL().term);
    const isSearchOpen = ref(false);
    const searchBarRef = ref(null);
    const { categories: cat1, search: search1 } = useCategory("categories");
    console.log({ cat1 });
    const topNavigation = ref([
      {
        name: "Product",
        id: 1,
        slug: "",
      },
      {
        name: "Quick Shop",
        id: 2,
        slug: "",
      },
      {
        name: "Offers",
        id: 3,
        slug: "offers",
      },
      {
        name: "Avonn Loves Blog",
        id: 4,
        slug: "",
      },
      {
        name: "REP HUB",
        id: 5,
        slug: "",
      },
    ]);
    // const subCategories = computed(() => {
    //   return {
    //     ...cat1.value.filter((cat) => {
    //       return cat.parent != null;
    //     }),
    //   };
    // });
    const routeCart = () => {
      return root.$router.push(`/cart`);
    };

    const categoryList = computed(() => {
      return cat1.value.filter((cat) => {
        return cat.parent === null;
      });
    });
    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });
    const accountIcon = computed(() =>
      isAuthenticated.value ? "profile_fill" : "profile"
    );
    // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4927
    const handleAccountClick = async () => {
      if (isAuthenticated.value) {
        return root.$router.push("/my-account");
      }
      toggleLoginModal();
    };
    const toggleMenu = () => {
      menuLeftPosition.value = !menuOpen.value ? "0px" : "-1000px";
      menuOpen.value = !menuOpen.value;
    };
    const toggleSubMenu = (e) => {
      let target = e.target.childNodes[3];
      if (typeof target != "undefined") {
        target.style.right = subMenuToggle.value ? "1000px" : "0px";
        subMenuToggle.value = !subMenuToggle.value;
      } else {
        e.target.parentElement.style.right = "1000px";
        subMenuToggle.value = false;
      }
    };
    onSSR(async () => {
      await loadUser();
      await loadCart();
      await loadWishlist();
      await search1({ customQuery: { categories: "get-parent-category" } });
    });
    onMounted(async () => {});
    const closeSearch = () => {
      if (!isSearchOpen.value) return;
      term.value = "";
      isSearchOpen.value = false;
      setTermForUrl(term.value);
    };
    const handleSearch = debounce(async (paramValue) => {
      console.log("searchValue", paramValue);
      if (!paramValue.target) {
        term.value = paramValue;
      } else {
        term.value = paramValue.target.value;
      }
      setTermForUrl(term.value);
      //await search(getSearchTermFromUrl(term.value));
    }, 1000);
    const isMobile = computed(() => mapMobileObserver().isMobile.get());
    const closeOrFocusSearchBar = () => {
      if (isMobile.value) {
        return closeSearch();
      } else {
        term.value = "";
        return searchBarRef.value.$el.children[0].focus();
      }
    };
    watch(
      () => term.value,
      (newVal, oldVal) => {
        const shouldSearchBeOpened =
          !isMobile.value &&
          term.value.length > 0 &&
          ((!oldVal && newVal) ||
            (newVal.length !== oldVal.length && isSearchOpen.value === false));
        if (shouldSearchBeOpened) {
          isSearchOpen.value = true;
        }
      }
    );
    onBeforeUnmount(() => {
      unMapMobileObserver();
    });
    return {
      subMenuToggle,
      topNavigation,
      toggleMenu,
      toggleSubMenu,
      menuLeftPosition,
      menuOpen,
      accountIcon,
      cartTotalItems,
      handleAccountClick,
      toggleCartSidebar,
      toggleWishlistSidebar,
      setTermForUrl,
      term,
      isSearchOpen,
      closeSearch,
      handleSearch,
      result,
      closeOrFocusSearchBar,
      searchBarRef,
      isMobile,
      categoryList,
      routeCart,
    };
  },
};
</script>

<style lang="scss" scoped>
.seperator-avon {
  border-bottom: solid;
  border-image-slice: 1;
  border-bottom-width: 3px;
  border-image-source: linear-gradient(
    to right,
    #7f28c4 -6%,
    #e2197c 62%,
    #e5231b 100%
  );
}
.header-block {
  border: 1px solid #8d97a05e;
  .main_Wrapper {
    -webkit-box-shadow: 1px 12px 15px -16px grey;
    -moz-box-shadow: 1px 12px 15px -16px grey;
    box-shadow: 1px 12px 15px -16px grey;
  }
}
.sf-header {
  --header-padding: var(--spacer-sm);
  @include for-desktop {
    --header-padding: 0;
  }
  &__logo-image {
    height: 100%;
  }
}
.header-on-top {
  z-index: 2;
}
.nav-item {
  --header-navigation-item-margin: 0 var(--spacer-base);
}
.cart-badge {
  position: absolute;
  bottom: 40%;
  left: 40%;
}
/*Mobile Css */
.header-avon {
  box-shadow: 0px -9px 20px grey;
  padding-bottom: 6px;
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 15px 5px 15px;
    .mobile-menu {
      .closeMenu {
        span {
          &:nth-child(1) {
            transform: rotate(45deg);
          }
          &:nth-child(2) {
            display: none;
          }
          &:nth-child(3) {
            transform: rotate(135deg);
            margin-top: -5px;
            margin-bottom: 7px;
          }
        }
      }
      div {
        span {
          transition: 0.1s ease-in;
          width: 33px;
          border-top: 5px solid black;
          display: block;
          margin-top: 5px;
          border-radius: 16px;
          &:first-child {
            margin-top: 0;
          }
        }
        small {
          font-size: 11px;
          color: #000;
          font-family: var(--font-family);
          font-weight: 500;
        }
      }
    }
    .account-block {
      display: flex;
      align-items: center;
      .account {
        margin-right: 15px;
        #Svg_avatar-user {
          width: 25px;
          color: var(--c-primary);
        }
      }
      .cart-bag {
        position: relative;
        .cart-count {
          background: #000;
          color: #fff;
          font-family: "Roboto";
          font-size: 11px;
          border-radius: 10px;
          position: absolute;
          padding: 3px 6px;
          top: -7px;
          left: -8px;
          border: 1px solid #fff;
        }
        #Svg_bag {
          width: 31px;
          color: var(--c-primary);
          .whiteFill {
            fill: #fff;
          }
        }
      }
    }
  }
  .sf-header__search {
    display: block;
    width: 93%;
    margin: 0 auto;
    background: #f3f3f3;
    border-radius: 25px;
    padding: 0px 17px;
    margin-top: 6px;
  }
  aside.smartphone-only {
    display: flex;
    background: #fff;
    justify-content: flex-start;
    flex-direction: column;
    width: 80%;
    padding-bottom: 50px;
    min-height: 100%;
    position: absolute;
    z-index: 999;
    left: -1000px;
    top: 106px;
    transition: 0.3s ease-in;
    box-shadow: 7px 10px 23px -13px grey;
    .top_navigation,
    .category_navigation {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 25px;
      a {
        padding: 15px 20px;
        width: 88%;
        font-family: var(--font-family);
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 500;
        .chevron_right {
          float: right;
        }
      }
    }
  }
}
.top_navigation {
  font-family: var(--font-family);
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  .mobNav {
    width: 100%;
    padding: 0;
    margin: 0;
    &__parent {
      &:hover {
        border-bottom-color: #7f28c4;
        text-decoration: none;
        color: #7f28c4;
      }
    }
    &__child {
      transition: 0.8s ease-in;
      padding: 0;
      position: absolute;
      background: #fff;
      z-index: 999;
      width: 100%;
      min-height: 100%;
      right: 1000px;
      top: 0;
      p {
        padding: 10px 10px;
        margin: 10px 0px 0px 0px;
        border-bottom: 1px solid black;
        .sf-icon {
          display: inline-block;
          margin-right: 10px;
        }
      }
    }
    li {
      cursor: pointer;
      font-size: 20px;
      font-weight: 500;
      color: rgb(0, 0, 0);
      padding: 12px 20px;
      text-transform: uppercase;
      border-bottom: solid;
      border-bottom-width: 1px;
      border-bottom-color: transparent;
      list-style: none;
      border-bottom: 1px solid #928f8f;
      line-height: 30px;
      & > .sf-icon {
        display: inline-block;
        position: absolute;
        right: 20px;
      }
    }
  }
}

/* DESKTOP CSS*/
.miniCart {
  font-size: 13px;
  font-weight: 100;
  color: var(--c-primary);
  font-family: var(--font-family);
  #Svg_bag {
    width: 31px;
    margin-right: 10px;
    color: var(--c-primary);
    .whiteFill {
      fill: #fff;
    }
  }
}
.wishlistHeader {
  position: absolute;
  font-size: 11px;
  font-weight: 100;
  color: var(--text-secondary);
  font-family: var(--font-family);
  right: 0;
  text-transform: uppercase;
  .sf-icon {
    margin-right: 3px;
  }
}
.sf-header__search {
  display: block;
  width: 93%;
  background: #fff;
  border-radius: 25px;
  padding: 0px 17px;
  margin-top: 6px;
  border: 1px solid #ccc7c7;
  .sf-search-bar__button {
    top: 5px;
  }
}
.top_navigation_desk {
  @include for-desktop {
    font-family: var(--font-family);
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    margin-top: 20px;
    a {
      padding: 10px 20px;
      font-size: 12px;
      text-transform: uppercase;
      color: var(--text-secondary);
      font-weight: 100;
      border-bottom: 1px solid #fff;
      &:nth-child(3) {
        color: var(--text-highlight);
        font-weight: bold;
      }
      &:hover {
        color: var(--c-primary);
        border-bottom: 1px solid var(--c-primary);
      }
    }
  }
  @include for-mobile {
    display: flex;
    flex-direction: column;
    a {
      cursor: pointer;
      font-size: 20px;
      font-weight: 500;
      color: rgb(0, 0, 0);
      padding: 12px 20px;
      text-transform: uppercase;
      border-bottom: solid;
      border-bottom-width: 1px;
      border-bottom-color: transparent;
      list-style: none;
      border-bottom: 1px solid #928f8f;
      line-height: 30px;
      font-family: var(--font-family);
      & > .sf-icon {
        display: inline-block;
        position: absolute;
        right: 20px;
      }
    }
  }
}
.category_navigation {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  border-top: solid;
  border-image-slice: 1;
  border-top-width: 3px;
  border-image-source: linear-gradient(
    to right,
    #7f28c4 -6%,
    #e2197c 62%,
    #e5231b 100%
  );
  ul {
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    li {
      cursor: pointer;
      font-size: 15px;
      font-weight: 100;
      color: var(--text-secondary);
      position: relative;
      flex: 1;
      padding: 12px;
      text-transform: uppercase;
      border-bottom: solid;
      border-bottom-width: 1px;
      border-bottom-color: transparent;
      text-align: center;
      list-style: none;
      font-family: var(--font-family);
      transition: 0.3s ease;
      &:hover {
        border-bottom-color: var(--c-primary);
        text-decoration: none;
        color: var(--c-primary);
        .subCat {
          transition: 0.8s ease-in;
          display: block;
        }
      }
      .subCat {
        width: 100%;
        display: none;
        position: absolute;
        background: #fff;
        z-index: 9;
        top: 44px;
        left: 0;
        box-shadow: 0px 11px 22px -6px grey;
        li {
          transition: 0.5s ease-in;
          width: 85%;
          a {
            font-size: 13px;
          }
          &:hover {
            background: var(--c-primary);
            a {
              color: #fff;
            }
          }
        }
      }
    }
  }
}

.shine::before {
  position: absolute;
  top: 0;
  left: -75%;
  z-index: 2;
  display: block;
  content: "";
  width: 50%;
  height: 100%;
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0%,
    rgb(255, 255, 255) 100%
  );
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgb(255, 255, 255) 100%
  );
  -webkit-transform: skewX(-25deg);
  transform: skewX(-25deg);
}
.shine:hover::before {
  -webkit-animation: shine 0.9s;
  animation: shine 0.9s;
}
@-webkit-keyframes shine {
  100% {
    left: 125%;
  }
}
@keyframes shine {
  100% {
    left: 125%;
  }
}
</style>