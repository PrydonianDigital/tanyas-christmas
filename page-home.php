<?php
	/*
	Template Name: Home Page
	*/
	get_header();
?>

	<div class="small-12 medium-6 columns advent">

		<div class="callout leftPane" data-closable="slide-out-up">
			<div id="leftContent"></div>
			<button class="close-button" aria-label="Dismiss alert" type="button" data-close>
				<span aria-hidden="true">&times;</span>
			</button>
		</div>

		<main class="container">
			<div class="contentBoxes">

			<div class="row normal animated fadeInDownBig mobile">
				<?php the_custom_logo(); ?>
			</div>

			<?php
				$args = array(
					'post_type' => 'post'
				);
				$boxes = new WP_Query( $args );
				if ($boxes->have_posts()) : while ($boxes->have_posts()) : $boxes->the_post();
			?>

				<?php
					date_default_timezone_set("Europe/London");
					global $post;
					$post_thumbnail_id = get_post_thumbnail_id( $post->ID );
					$full_size_image   = wp_get_attachment_image_src( $post_thumbnail_id, 'squared' );
				?>
				<style>
					.cube<?php the_title(); ?> > * {
						background-image: url(<?php echo $full_size_image[0]; ?>);
					}
				</style>
				<div class="qube-perspective spin cube<?php the_title(); ?>" data-id="<?php the_ID(); ?>" data-title="<?php the_title(); ?>" data-date="<?php $date = get_post_meta($post->ID, '_post_date', true); echo $date; ?>" data-today="<?php echo date('U'); ?>">
					<ul class="qube cube01 qube-preserve3d x-axis cube<?php the_title(); ?> solid qube-preserve3d">
						<li class="front"><?php the_title(); ?></li>
						<li class="left"><?php the_title(); ?></li>
						<li class="back"><?php the_title(); ?></li>
						<li class="right"><?php the_title(); ?></li>
						<li class="top"><?php the_title(); ?></li>
						<li class="bottom"><?php the_title(); ?></li>
					</ul>
				</div>

			<?php endwhile; ?>

			<?php endif; ?>
			</div>
		</main>

	</div>

	<div class="small-12 medium-6 columns content">

		<div class="callout rightPane" data-closable="slide-out-up">
			<div id="rightContent"></div>
			<button class="close-button" aria-label="Dismiss alert" type="button" data-close>
				<span aria-hidden="true">&times;</span>
			</button>
		</div>

		<div id="mainStuff">

			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

			<div class="row normal animated fadeInDownBig desktop">
				<?php the_custom_logo(); ?>
			</div>

			<?php
				$entries = get_post_meta( get_the_ID(), '_home_home', true );
				foreach ( (array) $entries as $key => $entry ) {
					$header = '';

					if ( isset( $entry['_home_header'] ) ) {
						$header = esc_html( $entry['_home_header'] );
					}
			?>
				<div class="row normal animated fadeInDownBig" style="-webkit-animation-delay: <?php echo $key; ?>.75s;-moz-animation-delay: <?php echo $key; ?>.75s;-ms-animation-delay: <?php echo $key; ?>.75s;animation-delay: <?php echo $key; ?>.75s;">
					<div class="small-12 columns">
						<button class="hollow button secondary" href="#" data-key="<?php echo $key; ?>"><?php echo $header; ?></button>
					</div>
				</div>

			<?php
				}
			?>
			<?php endwhile; ?>

			<?php endif; ?>

		</div>

	</div>

<?php get_footer(); ?>