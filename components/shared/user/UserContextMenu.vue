<script setup lang="ts">
import { CircleQuestionMark, Settings, LogOut, User } from "lucide-vue-next";

const store = useUserStore();
const { user } = storeToRefs(store);

function logout() {
  store.logout();
  navigateTo(useLocalePath()("/auth/login"));
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
          Mon profil
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />
          Paramètres
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <CircleQuestionMark />
          Obtenir de l'aide
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem
          variant="destructive"
          @click="logout"
        >
          <LogOut />
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
