<script setup lang="ts">
import { CircleQuestionMark, Settings, LogOut, User } from "lucide-vue-next";

const store = useUserStore();
const { user } = storeToRefs(store);

async function logout() {
  await store.logout();
  navigateTo(useLocalePath()("/"));
}
</script>

<template>
  <DropdownMenu v-if="user">
    <DropdownMenuTrigger as-child>
      <Button
        v-if="user"
        size="icon"
        variant="ghost"
      >
        <Avatar class="size-9 rounded-md">
          <AvatarFallback class="rounded-md">
            {{ user.username.substring(0, 2).toUpperCase() }}
          </AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User />
          {{ $t("app.user-context.profile") }}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />
          {{ $t("app.user-context.settings") }}
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <CircleQuestionMark />
          {{ $t("app.user-context.getting-help") }}
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          variant="destructive"
          @click="logout"
        >
          <LogOut />
          {{ $t("app.user-context.log-out") }}
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
