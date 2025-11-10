import { reactive } from "vue";

export const store = reactive({
  email: null as string | null,
  name: null as string | null,
  updateProfile({
    name,
    email,
  }: {
    name: string | null;
    email: string | null;
  }) {
    this.email = email;
    this.name = name;
  },
  hasLogin: false,
  updateHasLogin(value: boolean) {
    this.hasLogin = value;
  },
});
