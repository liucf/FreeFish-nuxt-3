<template>
  <section class="container mx-auto">
    <Form class="mt-10 space-y-8 divide-y divide-gray-200" @submit="onSubmit">
      <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div class="space-y-6 sm:space-y-5">
          <div>
            <h3 class="text-lg font-medium leading-6 text-gray-900">List</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Please fill in the information below to list your item.
            </p>
          </div>

          <div class="space-y-6 sm:space-y-5">
            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="cover-photo"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >Cover photo</label
              >
              <div class="mt-1 sm:col-span-2 sm:mt-0">
                <div
                  class="flex max-w-lg justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5"
                >
                  <div class="space-y-1 text-center">
                    <svg
                      v-if="!form.image"
                      class="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div v-else class="mb-4">
                      <img
                        :src="previewURL"
                        class="mx-auto h-64 w-64 rounded-sm object-cover"
                      />
                    </div>
                    <div class="flex text-sm text-gray-600">
                      <label
                        for="image"
                        class="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          class="sr-only"
                          @change="changeFile"
                        />
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="name"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >Title</label
              >
              <div class="mt-1 sm:col-span-2 sm:mt-0">
                <Field
                  type="text"
                  name="title"
                  id="title"
                  v-model="form.name"
                  autocomplete="address-level2"
                  class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-lg sm:text-sm"
                  :rules="validateRequired"
                />
                <ErrorMessage
                  class="text-sm italic text-red-600"
                  name="title"
                />
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="rootcategory"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >Category</label
              >
              <div class="mt-1 sm:col-span-2 sm:mt-0">
                <select
                  id="rootcategory"
                  name="rootcategory"
                  v-model="form.rootcategory"
                  class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-lg sm:text-sm"
                  @change="changeRootCategory"
                >
                  <option value="0" selected="selected">
                    Please select ...
                  </option>
                  <option
                    v-for="(category, index) in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="category"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >Sub Category</label
              >
              <div class="mt-1 sm:col-span-2 sm:mt-0">
                <select
                  id="subcategory"
                  name="subcategory"
                  v-model="form.subcategory"
                  class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-lg sm:text-sm"
                >
                  <option value="0" selected="selected">
                    Please select ...
                  </option>
                  <option
                    v-for="(subcategory, index) in subcategories"
                    :key="subcategory.id"
                    :value="subcategory.id"
                  >
                    {{ subcategory.name }}
                  </option>
                </select>
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="description"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >Description</label
              >
              <div class="mt-1 sm:col-span-2 sm:mt-0">
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows="3"
                  v-model="form.description"
                  class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  :rules="validateRequired"
                />
                <p class="mt-2 text-sm text-gray-500">
                  Write a few sentences about your item.
                </p>
                <ErrorMessage
                  class="text-sm italic text-red-600"
                  name="description"
                />
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="city"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >City</label
              >
              <div class="mt-1 sm:col-span-2 sm:mt-0">
                <Field
                  type="text"
                  name="city"
                  id="city"
                  v-model="form.city"
                  autocomplete="address-level2"
                  class="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                  :rules="validateRequired"
                />
                <ErrorMessage class="text-sm italic text-red-600" name="city" />
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5"
            >
              <label
                for="price"
                class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >Price</label
              >
              <div class="mt-1 sm:col-span-2 sm:mt-0">
                <div class="flex max-w-lg rounded-md shadow-sm sm:max-w-xs">
                  <span
                    class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm"
                    >NZ$</span
                  >
                  <Field
                    type="number"
                    name="price"
                    id="price"
                    v-model="form.price"
                    class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    :rules="validateRequired"
                  />
                </div>
                <ErrorMessage
                  class="text-sm italic text-red-600"
                  name="price"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="pt-5">
        <div class="flex justify-end">
          <button
            type="submit"
            class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </div>
    </Form>
  </section>
</template>

<script setup>
import axios from "axios";
import { Form, Field, ErrorMessage } from "vee-validate";

definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "Tell | " + useState("title").value,
});

let previewURL = ref("");

let form = ref({
  name: "",
  price: null,
  rootcategory: 0,
  subcategory: 0,
  category: 0,
  description: "",
  city: "",
  image: null,
});

let categories = await myFetch("/api/category");
let subcategories = ref([]);
function validateRequired(value) {
  if (!value) {
    return "This field is required";
  }
  return true;
}

function changeFile(e) {
  console.log(e.target.files[0]);
  form.value.image = e.target.files[0];
  previewURL.value = URL.createObjectURL(e.target.files[0]);
}

function changeRootCategory() {
  // console.log(form.value.rootcategory);
  const rcat = categories.filter(
    (category) => category.id == form.value.rootcategory,
  );
  subcategories.value = rcat[0].sub_category;
  // console.log(subcategories);
  // form.value.subcategory = subcategories[0].id;
  // console.log(form.value.subcategory);
}

function onSubmit() {
  // console.log(form.value);

  let formData = new FormData();

  formData.append("name", form.value.name);
  formData.append("price", form.value.price);
  formData.append("rootcategory", form.value.rootcategory);
  formData.append("subcategory", form.value.subcategory);
  formData.append("category", form.value.category);
  formData.append("description", form.value.description);
  formData.append("city", form.value.city);
  formData.append("image", form.value.image);

  // console.log(formData);

  const config = useRuntimeConfig();
  const token = useCookie("XSRF-TOKEN");

  (axios.defaults.baseURL = config.public.BASE_URL_SERVER),
    (axios.defaults.withCredentials = true);
  axios
    .post("/api/sell", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-XSRF-TOKEN": token.value,
      },
    })
    .then((res) => {
      // console.log(res);
      window.location.href = "/my/products";
    })
    .catch((err) => console.log(err));
  return false;
}
</script>
