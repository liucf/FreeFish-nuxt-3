<template>
    <div>
        <Menu as="div" class="relative m-4">
            <div class="flex">
                <MenuButton class="inline-flex w-full justify-center rounded-md items-center">
                    <span v-if="activeTheme == 'light'">
                        <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="w-6 h-6">
                            <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" class="stroke-slate-400 dark:stroke-slate-500">
                            </path>
                            <path
                                d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                                class="stroke-slate-400 dark:stroke-slate-500"></path>
                        </svg>
                    </span>
                    <span v-if="activeTheme == 'dark'">
                        <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6 mr-2">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                                class="fill-transparent"></path>
                            <path
                                d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                                class="fill-slate-400 dark:fill-slate-500"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                                class="fill-slate-400 dark:fill-slate-500"></path>
                        </svg>
                    </span>
                    <span v-if="activeTheme == 'system'">
                        <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6 mr-2">
                            <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
                                stroke-width="2" stroke-linejoin="round" class="stroke-yellow-300 fill-yellow-400/20">
                            </path>
                            <path d="M14 15c0 3 2 5 2 5H8s2-2 2-5" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="stroke-yellow-300"></path>
                        </svg>
                    </span>
                </MenuButton>
            </div>

            <transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <MenuItems
                    class="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="py-1">
                        <MenuItem>
                        <button @click="activeTheme = 'light'" :class="[
                            activeTheme == 'light' ? 'text-primary' : 'text-gray-900',
                            'group flex w-full items-center  px-2 py-2 text-sm hover:bg-gray-200',
                        ]">
                            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="w-6 h-6 mr-2">
                                <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    class="stroke-slate-400 dark:stroke-slate-500"></path>
                                <path
                                    d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
                                    class="stroke-slate-400 dark:stroke-slate-500"></path>
                            </svg>
                            Light
                        </button>
                        </MenuItem>
                    </div>


                    <div>
                        <MenuItem>
                        <button @click="activeTheme = 'dark'" :class="[
                            activeTheme == 'dark' ? 'bg-primary text-white' : 'text-gray-900',
                            'group flex w-full items-center px-2 py-2 text-sm hover:bg-gray-200',
                        ]">
                            <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6 mr-2">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
                                    class="fill-transparent"></path>
                                <path
                                    d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
                                    class="fill-slate-400 dark:fill-slate-500"></path>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
                                    class="fill-slate-400 dark:fill-slate-500"></path>
                            </svg>

                            Dark
                        </button>
                        </MenuItem>
                    </div>

                    <div>
                        <MenuItem>
                        <button @click="activeTheme = 'system'" :class="[
                            activeTheme == 'system' ? 'bg-primary text-white' : 'text-gray-900',
                            'group flex w-full items-center px-2 py-2 text-sm hover:bg-gray-200',
                        ]">
                            <svg viewBox="0 0 24 24" fill="none" class="w-6 h-6 mr-2">
                                <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
                                    stroke-width="2" stroke-linejoin="round" class="stroke-yellow-300 fill-yellow-400/20">
                                </path>
                                <path d="M14 15c0 3 2 5 2 5H8s2-2 2-5" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="stroke-yellow-300"></path>
                            </svg>

                            System
                        </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </transition>
        </Menu>
    </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
let activeTheme = ref('system')

onMounted(() => {
    activeTheme.value = localStorage.getItem('theme') || 'system'
});

watch(activeTheme, (value) => {
    if (value === 'light') {
        localStorage.setItem('theme', 'light')
    } else if (value === 'dark') {
        localStorage.setItem('theme', 'dark')
    } else {
        localStorage.removeItem('theme')
    }

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
})
</script>