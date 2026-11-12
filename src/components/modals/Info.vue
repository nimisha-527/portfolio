<template>
    <div class="modal-backdrop">
        <section
            class="info-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="info-modal-message"
        >
            <p id="info-modal-message">
                Waking up the free server... this may take up to 60 seconds on the first load.
            </p>
        </section>
    </div>
</template>

<script lang="ts">

export default {
    name: 'InfoModal'
}
</script>

<style scoped>
.modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: grid;
    place-items: center;
    padding: 1.5rem;
    background: rgb(0 0 0 / 45%);
}

.info-modal {
    width: min(100%, 28rem);
    padding: 1.5rem;
    border-top: 4px solid #a47864;
    border-radius: 0.5rem;
    background: #fff;
    box-shadow: 0 1rem 2.5rem rgb(0 0 0 / 20%);
    color: #292421;
    text-align: center;
}

.info-modal p {
    margin: 0.75rem 0 0;
    line-height: 1.5;
}
</style>