
			<div class="loot-filters">
				<div class="loot-filter-button dropdown dropdown-button" v-if="$root.lootFilterClasses.length > 0">
					{{ $root.lootFilterClass?.name ?? 'All Classes' }}
					<div class="dropdown-menu">
						<div class="dropdown-menu-item" :class="{ active: $root.lootFilterClass == null }" @click="$root.lootFilterClass = null">All Classes</div>
						<div class="dropdown-menu-item" v-for="entry in $root.lootFilterClasses" @click="$root.lootFilterClass = entry" :class="{ active: $root.lootFilterClass == entry }">{{ entry.name }}</div>
					</div>
				</div>
				<div class="loot-filter-button dropdown dropdown-button" v-if="$root.lootFilterSpecializationsFiltered.length > 0">
					{{ $root.lootFilterSpecialization?.name ?? 'All Specs' }}
					<div class="dropdown-menu">
						<div class="dropdown-menu-item" :class="{ active: $root.lootFilterSpecialization == null }" @click="$root.lootFilterSpecialization = null">All Specializations</div>
						<div class="dropdown-menu-item" v-for="entry in $root.lootFilterSpecializationsFiltered" @click="$root.lootFilterSpecialization = entry" :class="{ active: $root.lootFilterSpecialization == entry }">{{ entry.name }}</div>
					</div>
				</div>
				<div class="loot-filter-button dropdown dropdown-button" v-if="$root.lootFilterItemTypes.length > 0">
					{{ $root.lootFilterItemType?.name ?? 'All Slots' }}
					<div class="dropdown-menu">
						<div class="dropdown-menu-item" :class="{ active: $root.lootFilterItemType == null }"  @click="$root.lootFilterItemType = null">All Slots</div>
						<div class="dropdown-menu-item" v-for="entry in $root.lootFilterItemTypes" @click="$root.lootFilterItemType = entry" :class="{ active: $root.lootFilterItemType == entry }">{{ entry.name }}</div>
					</div>
				</div>
			</div>
			<div class="loot-table">
				<div class="loot-table-entry" v-for="item in $root.currentLootTablePageEntries" @mouseenter="$root.setTooltipItem(item.item_id)" @mouseleave="$root.clearTooltip()">
					<div class="loot-table-entry-icon" :class="['quality-' + item.overall_quality]" :style="{ backgroundImage: 'url(' + $root.CSS_GAME_ASSET_BASE + 'icons/' + item.icon_fid + '.png)' }"></div>
					<div class="loot-table-entry-text">
						<div class="loot-table-entry-text-title" :class="['quality-' + item.overall_quality]">{{ item.name }}</div>
						<div class="loot-table-entry-text-itemlevel">Item Level: <span class="item-level">{{ item.item_level }}</span></div>
						<div class="loot-table-entry-text-class">
							<span>
								<template v-if="item.class_id === 2 || item.class_id === 4">{{ $root.INVENTORY_TYPE[item.inventory_type] }} ({{ $root.ITEM_SUB_CLASS[item.class_id][item.subclass_id] }})</template>
							</span>
						</div>
						<div class="loot-table-entry-text-boss" v-if="item.boss_name">
							Boss: {{ item.boss_name }}
						</div>
						<!--<div class="loot-table-entry-text-class">
							<span>
								<template v-if="item.class_id === 2 || item.class_id === 4">{{ $root.INVENTORY_TYPE[item.inventory_type] }} ({{ $root.ITEM_SUB_CLASS[item.class_id][item.subclass_id] }})</template>
							</span>
							<span v-if="item.boss_name">Boss: {{ item.boss_name }}</span>
						</div>-->
					</div>
				</div>
			</div>
			<div class="page-nav" v-if="$root.lootPageCount > 1">
				<div class="page-nav-btn" v-for="(n, index) in $root.lootPageCount" @click="$root.lootTableCurrentPage = index" :class="{ active: $root.lootTableCurrentPage === index }">{{ n }}</div>
			</div>
		