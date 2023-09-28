<div
	:class="classesList"
>
	<div :class="[baseClass + '__items']">
		<div
			:class="prevClasses"
			v-html="prevIcon"
			@click="prev"
		>
		</div>
		<div :class="firstPageClasses" @click="changePage(1)"><span>1</span></div>
		<div v-if="currentPage > 5" :class="[baseClass + '__item', baseClass + '__item--jump-prev']" @click="fastPrev"><span>...</span></div>
		<div v-if="currentPage === 5" :class="[baseClass + '__item']" @click="changePage(currentPage - 3)"><span>{{ currentPage - 3 }}</span></div>
		<div v-if="currentPage - 2 > 1" :class="[baseClass + '__item']" @click="changePage(currentPage - 2)"><span>{{ currentPage - 2 }}</span></div>
		<div v-if="currentPage - 1 > 1" :class="[baseClass + '__item']" @click="changePage(currentPage - 1)"><span>{{ currentPage - 1 }}</span></div>
		<div v-if="currentPage != 1 && currentPage != allPages" :class="[baseClass + '__item',baseClass + '__item--active']"><span>{{ currentPage }}</span></div>
		<div v-if="currentPage + 1 < allPages" :class="[baseClass + '__item']" @click="changePage(currentPage + 1)"><span>{{ currentPage + 1 }}</span></div>
		<div v-if="currentPage + 2 < allPages" :class="[baseClass + '__item']" @click="changePage(currentPage + 2)"><span>{{ currentPage + 2 }}</span></div>
		<div v-if="allPages - currentPage === 4" :class="[baseClass + '__item']" @click="changePage(currentPage + 3)"><span>{{ currentPage + 3 }}</span></div>
		<div v-if="allPages - currentPage >= 5" :class="[baseClass + '__item', baseClass + '__item--jump-next']" @click="fastNext"><span>...</span></div>
		<div v-if="allPages > 1" :class="lastPageClasses" @click="changePage(allPages)"><span>{{ allPages }}</span></div>
		<div
			:class="nextClasses"
			v-html="nextIcon"
			@click="next"
		>
		</div>
	</div>
</div>
					