<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js no-svg">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
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

<script>
var $buoop = {vs:{i:10,f:-2,o:-2,s:8,c:-2},unsecure:true,api:4};
function $buo_f(){
 var e = document.createElement("script");
 e.src = "//browser-update.org/update.min.js";
 document.body.appendChild(e);
};
try {document.addEventListener("DOMContentLoaded", $buo_f,false)}
catch(e){window.attachEvent("onload", $buo_f)}
</script>

	<div id="snow">
		<?php the_custom_header_markup(); ?>
	</div>

	<div class="row expanded">