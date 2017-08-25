<?php
	/*
	Template Name: Home Page
	*/
	get_header();
?>

	<div class="small-12 medium-6 columns advent front">

		<h2 class="turn"><i class="fa fa-arrow-right"></i></h2>

		<div class="contentBoxes row align-middle" id="calendar">

			<div class="small-12 columns text-center animated fadeInDownBig mobile">
				<?php the_custom_logo(); ?>
			</div>

			<div id="title" class="small-12 text-center animated fadeInDownBig"><?php echo bloginfo('name'); ?></div>

			<?php
				$args = array(
					'post_type' => 'post'
				);
				$boxes = new WP_Query( $args );
				if ($boxes->have_posts()) : while ($boxes->have_posts()) : $boxes->the_post();
					date_default_timezone_set("Europe/London");
					global $post;
					$post_thumbnail_id = get_post_thumbnail_id( $post->ID );
					$full_size_image   = wp_get_attachment_image_src( $post_thumbnail_id, 'squared' );
			?>
			<div class="atvImg small-3 columns" data-id="<?php the_ID(); ?>" data-title="<?php the_title(); ?>" data-date="<?php $date = get_post_meta($post->ID, '_post_date', true); echo $date; ?>" data-today="<?php echo date('U'); ?>">
			   <img src="<?php echo $full_size_image[0]; ?>">
			   <?php
				   $entries = get_post_meta( get_the_ID(), '_post_post', true );
				   foreach ( (array) $entries as $key => $entry ) {
					   $img = '';
					   if ( isset( $entry['_post_img'] ) ) {
						   $img = esc_html( $entry['_post_img'] );
						}
			   ?>
			   <div class="atvImg-layer" data-img="<?php echo $img; ?>"></div>
				<?php
					}
				?>
			</div>

			<?php endwhile; ?>

			<?php endif; ?>

			<div id="tagline" class="small-12 text-center animated fadeInUpBig"><?php echo bloginfo('description'); ?></div>

		</div>

		<div class="reveal full" id="boxModal" data-reveal data-animation-in="scale-in-up" data-animation-out="scale-out-down"></div>

	</div>

	<div class="small-12 medium-6 columns content back">

		<h2 class="turn left"><i class="fa fa-arrow-left"></i></h2>

		<div id="mainStuff">

			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

				<div class="row animated fadeInDownBig desktop" style="-webkit-animation-delay: 4.5s;-moz-animation-delay: 4.5s;-ms-animation-delay: 4.5s;animation-delay: 4.5s;">
					<div class="small-12 columns text-center">
						<?php the_custom_logo(); ?>
					</div>
				</div>
				<div class="row normal text-center align-middle">
				<?php
					$child_pages_query_args = array(
					    'post_type'		=> 'page',
					    'post_parent'	=> $post->ID,
					    'orderby'		=> 'menu_order',
					    'order'			=> 'ASC'
					);
					$child_pages = new WP_Query( $child_pages_query_args );
					if ( $child_pages->have_posts() ) : while ( $child_pages->have_posts() ) : $child_pages->the_post();
				?>

						<div class="small-6 columns animated fadeInDownBig text-center icon" style="-webkit-animation-delay: <?php echo get_post_field( 'menu_order', $post->ID); ?>s;-moz-animation-delay: <?php echo get_post_field( 'menu_order', $post->ID); ?>s;-ms-animation-delay: <?php echo get_post_field( 'menu_order', $post->ID); ?>s;animation-delay: <?php echo get_post_field( 'menu_order', $post->ID); ?>s;">
							<h4 class="pageTitle" data-page="<?php the_ID(); ?>">
								<?php the_post_thumbnail('right'); ?>
								<?php the_title(); ?>
							</h4>
							</div>

				<?php endwhile; ?>

				<?php endif; ?>

				<?php wp_reset_postdata(); ?>
				</div>
			<?php endwhile; ?>

			<?php endif; ?>

		</div>

	</div>

<?php get_footer(); ?>