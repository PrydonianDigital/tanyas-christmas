<?php get_header(); ?>

	<div class="small-12 medium-6 columns advent">

		<main>

			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

				<?php
					global $post;
					$post_thumbnail_id = get_post_thumbnail_id( $post->ID );
					$full_size_image   = wp_get_attachment_image_src( $post_thumbnail_id, 'squared' );
				?>
				<article <?php post_class(); ?>>
					<div class="box" style="background: url(<?php echo $full_size_image[0]; ?>) no-repeat;">
						<h2><?php the_title(); ?></h2>
					</div>
					<div class="present">
						<div class="bauble">?</div>
					</div>
				</article>
				<div class="open-message">
					<button class="close-button" aria-label="Dismiss alert" type="button" data-close="">
					<span aria-hidden="true">×</span>
					</button>
					<?php the_content(); ?>
				</div>

			<?php endwhile; ?>

			<?php endif; ?>

		</main>

	</div>

	<div class="small-12 medium-6 columns">

	</div>

<?php get_footer(); ?>