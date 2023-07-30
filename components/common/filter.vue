<template>
    <!-- Filters -->
    <section aria-labelledby="filter-heading" class="border-t border-gray-200 pt-6">
        <h2 id="filter-heading" class="sr-only">Product filters</h2>

        <div class="flex items-center justify-between">
            <Menu as="div" class="relative inline-block text-left">
                <div>
                    <MenuButton
                        class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort by {{ sortOptions.find((option) => option.value === sort).name }}
                        <ChevronDownIcon class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true" />
                    </MenuButton>
                </div>

                <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95">
                    <MenuItems
                        class="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="py-1">
                            <MenuItem v-for="option in sortOptions" :key="option" v-slot="{ active }">
                            <a href="#" @click="sort = option.value"
                                :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm font-medium text-gray-900']">{{
                                    option.name }}</a>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </transition>
            </Menu>

            <button type="button" class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
                @click="mobileFiltersOpen = true">Filters</button>

            <PopoverGroup class="hidden sm:flex sm:items-baseline sm:space-x-8">
                <Popover as="div" v-for="(section, sectionIdx) in filters" :key="section.name" id="menu"
                    class="relative inline-block text-left">
                    <div>
                        <PopoverButton
                            class="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                            <span>{{ section.name }}</span>
                            <span v-if="sectionIdx === 0"
                                class="ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700">1</span>
                            <ChevronDownIcon
                                class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true" />
                        </PopoverButton>
                    </div>

                    <transition enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                        <PopoverPanel
                            class="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white p-4 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <form class="space-y-4">
                                <div v-for="(option, optionIdx) in section.options" :key="option.value"
                                    class="flex items-center">
                                    <input :id="`filter-${section.id}-${optionIdx}`" :name="`${section.id}[]`"
                                        :value="option.value" :checked="option.checked" type="checkbox"
                                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                    <label :for="`filter-${section.id}-${optionIdx}`"
                                        class="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900">{{
                                            option.label }}</label>
                                </div>
                            </form>
                        </PopoverPanel>
                    </transition>
                </Popover>
            </PopoverGroup>
        </div>
    </section>
</template>
