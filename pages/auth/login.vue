<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { Eye, EyeClosed, LoaderCircle } from "lucide-vue-next";

definePageMeta({
  layout: "auth",
  useAuth: true,
  isLoggedIn: false,
});

const store = useUserStore();
const { loading } = storeToRefs(store);

const showPassword = ref<boolean>(false);

const { handleSubmit, resetField } = useForm({
  validationSchema: toTypedSchema(z.object({
    email: z.string().email(),
    password: z.string()
      .min(8)
      .max(32)
      .refine(val => /[a-z]/.test(val))
      .refine(val => /[A-Z]/.test(val))
      .refine(val => /[0-9]/.test(val))
      .refine(val => /[^a-zA-Z0-9]/.test(val)),
  })),
});
const submit = handleSubmit(async (values) => {
  const state = await store.login(values);
  if (!state) {
    resetField("password");
    return;
  }
});
</script>

<template>
  <main
    data-page="auth.login"
    class="w-[min(280px,100%)] grid gap-6"
  >
    <header>
      <h1 class="text-xl font-bold">
        {{ $t("auth.login.title") }}
      </h1>
      <p class="text-sm text-muted-foreground">
        {{ $t("auth.login.caption") }}
      </p>
    </header>

    <form
      class="grid gap-4"
      @submit="submit"
    >
      <FormField
        v-slot="{ componentField }"
        name="email"
      >
        <FormItem>
          <FormLabel>{{ $t("auth.login.fields.email") }}</FormLabel>
          <FormControl v-bind="componentField">
            <Input
              type="email"
              placeholder="ex. john.doe@example.com"
              :disabled="loading"
            />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="password"
      >
        <FormItem>
          <FormLabel>{{ $t("auth.login.fields.password") }}</FormLabel>
          <div class="relative">
            <FormControl v-bind="componentField">
              <Input
                :type="showPassword ? 'text' : 'password'"
                :disabled="loading"
                class="pr-12"
              />
            </FormControl>
            <Button
              size="icon"
              variant="ghost"
              type="button"
              class="size-7 absolute top-1 right-1 rounded-sm"
              @click="showPassword = !showPassword"
            >
              <EyeClosed v-if="showPassword" />
              <Eye v-else />
            </Button>
          </div>
        </FormItem>
      </FormField>

      <footer class="grid gap-1 mt-2">
        <Button
          type="submit"
          :disabled="loading"
        >
          {{ $t("auth.login.btn.login") }}
          <LoaderCircle
            v-if="loading"
            class="animate-spin"
          />
        </Button>
        <Button
          type="button"
          variant="link"
          as-child
        >
          <NuxtLinkLocale to="/auth/register">
            {{ $t("auth.login.btn.not-registered") }}
          </NuxtLinkLocale>
        </Button>
      </footer>
    </form>
  </main>
</template>
