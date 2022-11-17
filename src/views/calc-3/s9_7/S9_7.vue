<template>
    <div class="question-selector">
        <router-link to="/calc-3/s9-7/1">
            <div class="question-icon">
                1
            </div>
        </router-link>
        <router-link to="/calc-3/s9-7/2">
            <div class="question-icon">
                2
            </div>
        </router-link>
        <router-link to="/calc-3/s9-7/3">
            <div class="question-icon">
                3
            </div>
        </router-link>
        <!-- <router-link to="/calc-3/s9-7/4">
            <div class="question-icon">
                4
            </div>
        </router-link> -->
    </div>
    <router-view class="problem-router-view"></router-view>
</template>