<script>
  let generatedUrl;

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function generate() {
    generatedUrl = `${window.location}?chatParam=${makeid(16)}`;
  }
</script>

<h2>معلومات التطبيق</h2>
<ul>
  <li>
    <span> * </span> يستخدم قاعدة البيانات اللامركزية بحيث تكون جميع بياناتك في مأمن
    من الجميع
  </li>
  <li>
    <span> * </span>
    يتم الاحتفاظ بالبيانات ولكن لا يتم تخزينها في أي خادم ولا يمكن الوصول إليها من
    قبلنا
  </li>
  <li>
    <span> * </span>
    تعتمد البيانات على المستخدمين النشطين ، لذلك قد لا تكون متوفرة على مدار الساعة
    طوال أيام الأسبوع أو إلى الأبد
  </li>
</ul>
<input bind:value={generatedUrl} />
<button class="login" on:click={generate}>انشىء غرفة</button>
{#if generatedUrl}
  <h3>شارك هذا الرابط مع اصحابك</h3>
{/if}

<style>
  * {
    direction: rtl;
  }
  p,
  li {
    color: black;
  }
  ul {
    margin-bottom: 40px;
  }
  ul,
  li {
    text-align: right;
  }
  span {
    color: tomato;
  }
  h2,
  h3 {
    margin-right: 36px;
    text-align: start;
  }
</style>
