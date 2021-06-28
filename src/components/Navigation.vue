<template>
  <header class="flex">
    <div class="branding flex">
      <img
        src="https://cdn.dribbble.com/users/2260294/screenshots/7148044/shot-cropped-1568556561030.png?compress=1&resize=800x600"
        alt=""
      />
    </div>
  </header>
</template>

<script>
export default {
  name: "navigation",
};
</script>

<style lang="scss" scoped>
header {
  z-index: 99;
  flex-direction: row;
  background-color: #1e2139;

  @media (min-width: 900px) {
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
  }
}

.branding {
  border-radius: 0 20px 20px 0;
  background-color: #7c5dfa;
  justify-content: center;
  padding: 24px;

  @media (min-width: 900px) {
    width: 100%;
  }
}

img {
  width: auto;
  height: 30px;
}
</style>
