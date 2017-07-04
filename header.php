<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">
<?php wp_head(); ?>
<link rel="stylesheet" type="text/css" href="<?php bloginfo('stylesheet_url'); ?>" />
</head>
<?php
	global $post;
	$post_thumbnail_id = get_post_thumbnail_id( $post->ID );
	$full_size_image   = wp_get_attachment_image_src( $post_thumbnail_id, 'full' );
?>
<body <?php body_class(); ?> itemscope itemtype="http://schema.org/WebPage" style="background: url(<?php echo $full_size_image[0]; ?>) no-repeat;">

	<div id="snow">
		<?php the_custom_header_markup(); ?>
	</div>

	<div id="titleContainer">
		<div id="title"><?php echo bloginfo('name'); ?></div>
		<div id="tagline"><?php echo bloginfo('description'); ?></div>
	</div>

	<div class="row expanded">