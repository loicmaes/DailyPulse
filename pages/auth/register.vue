<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Eye, EyeClosed, LoaderCircle } from "lucide-vue-next";
import { z } from "zod";

const { t } = useI18n();

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
    email: z.string({
      message: t("auth.register.fields.email.rule"),
    }).email(t("auth.register.fields.email.rule")),
    username: z.string({
      message: t("auth.register.fields.username.rules.length"),
    })
      .regex(/^[a-zA-Z0-9_.-]+$/, t("auth.register.fields.username.rules.format"))
      .min(4, t("auth.register.fields.username.rules.length"))
      .max(16, t("auth.register.fields.username.rules.length")),
    password: z.string({
      message: t("auth.register.fields.password.rules.length"),
    })
      .min(8, t("auth.register.fields.password.rules.length"))
      .max(32, t("auth.register.fields.password.rules.length"))
      .refine(val => /[a-z]/.test(val), t("auth.register.fields.password.rules.lower"))
      .refine(val => /[A-Z]/.test(val), t("auth.register.fields.password.rules.upper"))
      .refine(val => /[0-9]/.test(val), t("auth.register.fields.password.rules.digit"))
      .refine(val => /[^a-zA-Z0-9]/.test(val), t("auth.register.fields.password.rules.special")),
  })),
});
const submit = handleSubmit(async (values) => {
  const state = await store.register(values);
  if (!state) {
    resetField("password");
    return;
  }
});
</script>

<template>
  <main
    data-page="auth.register"
    class="w-[min(280px,100%)] grid gap-6"
  >
    <header>
      <h1 class="text-xl font-bold">
        {{ $t("auth.register.title") }}
      </h1>
      <p class="text-sm text-muted-foreground">
        {{ $t("auth.register.caption") }}
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
          <FormLabel>{{ $t("auth.register.fields.email.label") }}</FormLabel>
          <FormControl v-bind="componentField">
            <Input
              type="email"
              placeholder="ex. john.doe@example.com"
              :disabled="loading"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="username"
      >
        <FormItem>
          <FormLabel>{{ $t("auth.register.fields.username.label") }}</FormLabel>
          <FormControl v-bind="componentField">
            <Input
              placeholder="ex. john.doe"
              :disabled="loading"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="password"
      >
        <FormItem>
          <FormLabel>{{ $t("auth.register.fields.password.label") }}</FormLabel>
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
          <FormMessage />
        </FormItem>
      </FormField>

      <p class="mt-2 text-xs text-muted-foreground italic">
        {{ $t("auth.register.terms") }}
      </p>

      <footer class="grid gap-1">
        <Button
          type="submit"
          :disabled="loading"
        >
          {{ $t("auth.register.btn.create-account") }}
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
          <NuxtLinkLocale to="/auth/login">
            {{ $t("auth.register.btn.already-registered") }}
          </NuxtLinkLocale>
        </Button>
      </footer>
    </form>
  </main>
</template>
