<div class="signin">
    <h2 class="signin__title">Sign in</h2>
    <div class="signin__nitice notice"><?php $this->isNotice() ?></div>
    <form action="login" method="post" class="signin__form common-form">
        <dl class="signin__item common-form__item">
            <dt><label for="signin__email">email</label></dt>
            <dd><input id="signin__email" class="common-form__input" type="email" name="email" placeholder="example@email.co.jp"<?php $this->valueEmail() ?>></dd>
            <span class="postError"><?php $this->errorEmail() ?></span>
        </dl>
        <dl class="signin__item common-form__item">
            <dt><label for="signin__pass">password</label></dt>
            <dd><input id="signin__pass"  class="common-form__input" type="password" name="password"></dd>
            <span class="postError"><?php $this->errorPassword() ?></span>
        </dl>
        <div class="signin__item common-form__item">
            <input class="signin__submit common-form__input common-form__submit" type="submit" name="submit" value="Sign in">
        </div>
    </form>
</div>