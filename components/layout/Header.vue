<template>
  <!-- Mobile menu -->
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-40 lg:hidden" @close="open = false">
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel
            class="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl"
          >
            <div class="flex px-4 pb-2 pt-5">
              <button
                type="button"
                class="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                @click="open = false"
              >
                <span class="sr-only">Close menu</span>
                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <!-- Links -->
            <TabGroup as="div" class="mt-2">
              <div class="border-b border-gray-200">
                <TabList class="-mb-px flex space-x-8 px-4">
                  <Tab
                    as="template"
                    v-for="category in navigation.categories"
                    :key="category.name"
                    v-slot="{ selected }"
                  >
                    <button
                      :class="[
                        selected
                          ? 'border-b-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-900',
                        'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium',
                      ]"
                    >
                      {{ category.name }}
                    </button>
                  </Tab>
                </TabList>
              </div>
              <TabPanels as="template">
                <TabPanel
                  v-for="category in navigation.categories"
                  :key="category.name"
                  class="space-y-10 px-4 pb-8 pt-10"
                >
                  <div class="grid grid-cols-2 gap-x-4">
                    <div
                      v-for="item in category.featured"
                      :key="item.name"
                      class="group relative text-sm"
                    >
                      <div
                        class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                      >
                        <img
                          :src="item.imageSrc"
                          :alt="item.imageAlt"
                          class="object-cover object-center"
                        />
                      </div>
                      <a
                        :href="item.href"
                        class="mt-6 block font-medium text-gray-900"
                      >
                        <span
                          class="absolute inset-0 z-10"
                          aria-hidden="true"
                        />
                        {{ item.name }}
                      </a>
                      <p aria-hidden="true" class="mt-1">Shop now</p>
                    </div>
                  </div>
                  <div v-for="section in category.sections" :key="section.name">
                    <p
                      :id="`${category.id}-${section.id}-heading-mobile`"
                      class="font-medium text-gray-900"
                    >
                      {{ section.name }}
                    </p>
                    <ul
                      role="list"
                      :aria-labelledby="`${category.id}-${section.id}-heading-mobile`"
                      class="mt-6 flex flex-col space-y-6"
                    >
                      <li
                        v-for="item in section.items"
                        :key="item.name"
                        class="flow-root"
                      >
                        <a
                          :href="item.href"
                          class="-m-2 block p-2 text-gray-500"
                          >{{ item.name }}</a
                        >
                      </li>
                    </ul>
                  </div>
                </TabPanel>
              </TabPanels>
            </TabGroup>
            <div class="space-y-6 border-t border-gray-200 px-4 py-6">
              <div
                v-for="page in navigation.pages"
                :key="page.name"
                class="flow-root"
              >
                <NuxtLink
                  :href="page.href"
                  class="-m-2 block p-2 font-medium text-gray-900"
                  >{{ page.name }}
                </NuxtLink>
              </div>
            </div>

            <div class="border-t border-gray-200 px-4">
              <div v-if="!isLoggedIn" class="space-y-6 py-6">
                <div class="flow-root">
                  <NuxtLink
                    href="/login"
                    class="-m-2 block p-2 font-medium text-gray-900"
                    >Sign in
                  </NuxtLink>
                </div>
                <div class="flow-root">
                  <NuxtLink
                    href="/register"
                    class="-m-2 block p-2 font-medium text-gray-900"
                    >Create account
                  </NuxtLink>
                </div>
              </div>
              <div v-else class="space-y-6 py-6">
                <div class="flow-root">
                  <NuxtLink
                    to="/my"
                    class="-m-2 block p-2 font-medium text-gray-900"
                  >
                    My Account
                  </NuxtLink>
                </div>
                <div class="flow-root">
                  <a
                    class="-ml-2 block p-2 font-medium text-gray-900"
                    href="#"
                    @click.prevent="logout"
                    >Logout</a
                  >
                </div>
              </div>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <header class="relative">
    <!-- Top navigation -->
    <nav
      aria-label="Top"
      class="relative z-20 border-b border-gray-200 bg-white bg-opacity-90 backdrop-blur-xl backdrop-filter dark:border-gray-600 dark:bg-gray-800 dark:text-white"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center">
          <button
            type="button"
            class="rounded-md bg-white p-2 text-gray-400 lg:hidden"
            @click="open = true"
          >
            <span class="sr-only">Open menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Logo -->
          <div class="ml-4 flex lg:ml-0">
            <NuxtLink href="/" class="border-none">
              <span class="sr-only">Free Fish</span>
              <img
                class="h-8 w-auto rounded-md bg-primary"
                src="/logo.svg"
                alt="Logo"
              />
            </NuxtLink>
          </div>

          <!-- Flyout menus -->
          <PopoverGroup class="hidden lg:ml-8 lg:block lg:self-stretch">
            <div class="flex h-full space-x-8">
              <NuxtLink
                v-for="page in navigation.pages"
                :key="page.name"
                :href="page.href"
                class="header-link"
                >{{ page.name }}</NuxtLink
              >
              <Popover
                v-if="false"
                v-for="category in navigation.categories"
                :key="category.name"
                class="flex"
                v-slot="{ open }"
              >
                <div class="relative flex">
                  <PopoverButton
                    :class="[
                      open
                        ? 'border-b-indigo-600 text-indigo-600 '
                        : 'border-transparent text-gray-700 hover:text-gray-800',
                      'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out focus-visible:outline-transparent',
                    ]"
                  >
                    {{ category.name }}</PopoverButton
                  >
                </div>

                <transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0"
                  enter-to-class="opacity-100"
                  leave-active-class="transition ease-in duration-150"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <PopoverPanel
                    class="absolute inset-x-0 top-full bg-white text-sm text-gray-500"
                  >
                    <!-- Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow -->
                    <div
                      class="absolute inset-0 top-1/2 bg-white shadow"
                      aria-hidden="true"
                    />
                    <!-- Fake border when menu is open -->
                    <div
                      class="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8"
                      aria-hidden="true"
                    >
                      <div
                        :class="[
                          open ? 'bg-gray-200' : 'bg-transparent',
                          'h-px w-full transition-colors duration-200 ease-out',
                        ]"
                      />
                    </div>

                    <div class="relative">
                      <div class="mx-auto max-w-7xl px-8">
                        <div class="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                          <div class="col-start-2 grid grid-cols-2 gap-x-8">
                            <div
                              v-for="item in category.featured"
                              :key="item.name"
                              class="group relative text-base sm:text-sm"
                            >
                              <div
                                class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
                              >
                                <img
                                  :src="item.imageSrc"
                                  :alt="item.imageAlt"
                                  class="object-cover object-center"
                                />
                              </div>
                              <a
                                :href="item.href"
                                class="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  class="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {{ item.name }}
                              </a>
                              <p aria-hidden="true" class="mt-1">Shop now</p>
                            </div>
                          </div>
                          <div
                            class="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm"
                          >
                            <div
                              v-for="section in category.sections"
                              :key="section.name"
                            >
                              <p
                                :id="`${section.name}-heading`"
                                class="font-medium text-gray-900"
                              >
                                {{ section.name }}
                              </p>
                              <ul
                                role="list"
                                :aria-labelledby="`${section.name}-heading`"
                                class="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                              >
                                <li
                                  v-for="item in section.items"
                                  :key="item.name"
                                  class="flex"
                                >
                                  <a
                                    :href="item.href"
                                    class="hover:text-gray-800"
                                    >{{ item.name }}</a
                                  >
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverPanel>
                </transition>
              </Popover>
            </div>
          </PopoverGroup>

          <div class="ml-auto flex h-full items-center">
            <div
              v-if="!isLoggedIn"
              class="hidden h-full lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
            >
              <NuxtLink to="/login" class="header-link"> Sign in </NuxtLink>
              <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
              <NuxtLink to="/register" class="header-link">
                Create account</NuxtLink
              >
              <!-- <a class="header-link" href="#" @click.prevent="logout">Logout</a> -->
            </div>
            <div
              class="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6"
              v-else
            >
              <NuxtLink to="/my" class="header-link"> My Account </NuxtLink>
              <span class="h-6 w-px bg-gray-200" aria-hidden="true" />
              <a class="header-link" href="#" @click.prevent="logout">Logout</a>
            </div>
            <!-- Search -->
            <div class="flex lg:ml-6">
              <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
                <span class="sr-only">Search</span>
                <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
              </a>
            </div>

            <LayoutTheme />
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
const { isLoggedIn, removeUser } = useAuth();

import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

const navigation = {
  pages: [
    { name: "Home", href: "/" },
    { name: "Category", href: "/categories" },
    { name: "Sell", href: "/sell" },
    { name: "Contact", href: "/contact" },
  ],
};

const open = ref(false);

async function logout() {
  try {
    await myFetch("/logout", {
      method: "POST",
    });
  } catch (err) {
    console.log(err.data);
  } finally {
    removeUser();
    window.location.pathname = "/";
  }
}
</script>
