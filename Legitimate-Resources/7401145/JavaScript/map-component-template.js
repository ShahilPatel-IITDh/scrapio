
			<template v-if="$root.journalMapLevels.length > 0">
				<div class="dropdown dropdown-button" id="map-level-selector" v-if="$root.journalMapLevels.length > 1">
					{{ $root.journalSelectedMapLevel.name }}
					<div class="dropdown-menu">
						<a class="dropdown-menu-item" v-for="level in $root.journalMapLevels" @click="$root.journalSelectedMapID = level.id">{{ level.name }}</a>
					</div>
				</div>
				<div id="map-container">
					<map-canvas></map-canvas>
					<div class="map-pin" v-for="pin in $root.displayMapPins" :style="$root.getMapPinPosition(pin)">
						<a :data-href="'operation:none,encounter:' + pin.name_slug" :style="{ backgroundImage: 'url(' + $root.CSS_GAME_ASSET_BASE + 'creature_buttons/' + pin.creature_display_info_id + '.png)' }"></a>
						<div class="tooltip map-tooltip" :class="$root.getMapPinAnchors(pin)">
							<div class="tooltip-inner">
								<tt-title>{{ pin.name }}</tt-title>
								<template v-if="pin.description.length > 0">{{ pin.description }}</template>
							</div>
						</div>
					</div>
				</div>
			</template>
			<template v-else>
				No map available for this instance.
			</template>
		