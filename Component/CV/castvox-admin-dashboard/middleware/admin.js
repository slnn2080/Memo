export default function ({ app, redirect }) {
  if (app.$auth.loggedIn && app.$auth.user.roles[0].name !== "admin") {
    return redirect("/dashboard");
  }
}
