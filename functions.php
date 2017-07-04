<?php

	// Init CMB2
	if ( file_exists( dirname( __FILE__ ) . '/cmb2/init.php' ) ) {
		require_once dirname( __FILE__ ) . '/cmb2/init.php';
	} elseif ( file_exists( dirname( __FILE__ ) . '/CMB2/init.php' ) ) {
		require_once dirname( __FILE__ ) . '/CMB2/init.php';
	}

	// Set content width value based on the theme's design
	if ( ! isset( $content_width ) )
		$content_width = 870;

	// Register Theme Features
	function tc_theme()	{
		add_theme_support( 'post-thumbnails' );
		set_post_thumbnail_size( 870, 250, array( 'center', 'top') );
		add_image_size( 'top', 1130, 500, array( 'center', 'center') );
		add_image_size( 'tiny', 60, 60);
		add_image_size( 'related', 265, 199, array( 'center', 'center') );
		add_image_size( 'squared', 265, 265, array( 'center', 'top') );
		add_image_size( 'shop', 355, 222 );
		add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );
		add_theme_support( 'title-tag' );
		show_admin_bar(false);
		add_theme_support( 'custom-logo' , array(
			'flex-height' => true,
			'flex-width'  => true,
		) );
		add_theme_support( 'custom-header', array(
			'video' => true,
		) );
		load_theme_textdomain( 'tc', get_template_directory() . '/language' );
		add_theme_support( 'custom-logo', array(
			'height'			=> 150,
			'width'			 => 500,
			'flex-width' => true,
		) );
	}
	add_action( 'after_setup_theme', 'tc_theme' );

	// Register Style
	function tc_css() {
		wp_register_style( 'grid', get_template_directory_uri() . '/css/foundation.css', false, '6.3.1' );
		wp_register_style( 'animate', get_template_directory_uri() . '/css/animate.css', false, '3.5.2' );
		wp_enqueue_script( 'fontawesome', 'https://use.fontawesome.com/bfa003177d.js', false, '4.7.0', false );
		wp_enqueue_style( 'fontawesome' );
		wp_enqueue_style( 'grid' );
		wp_enqueue_style( 'animate' );
	}
	add_action( 'wp_enqueue_scripts', 'tc_css' );

	// Register JS
	function tc_js() {
		wp_enqueue_script( 'jq', get_template_directory_uri() . '/js/vendor/jquery.js', false, '2.2.4', true );
		wp_enqueue_script( 'what', get_template_directory_uri() . '/js/vendor/what-input.js', false, '6.3.1', true );
		wp_enqueue_script( 'foundation', get_template_directory_uri() . '/js/vendor/foundation.min.js', false, '6.3.1', true );
		wp_enqueue_script( 'tc', get_template_directory_uri() . '/js/interface.js', false, '1', true );
		wp_enqueue_script( 'jq' );
		wp_enqueue_script( 'what' );
		wp_enqueue_script( 'foundation' );
		wp_enqueue_script( 'tc' );
	}
	add_action( 'wp_enqueue_scripts', 'tc_js' );

	add_action( 'cmb2_init', 'post_page' );
	function post_page() {
		$prefix = '_post_';
		$cmb_post = new_cmb2_box( array(
			'id'			=> 'post',
			'title'		 => 'Post Header Section',
			'object_types'  => array( 'post' ),
			'show_in_rest'	=> true,
		) );
		$cmb_post->add_field(array(
			'name' => 'Title',
			'id'   => $prefix . 'title',
			'type' => 'text',
		) );
		$cmb_post->add_field(array(
			'name' => 'Content',
			'id'   => $prefix . 'stuff',
			'type' => 'wysiwyg',
		) );
		$cmb_post->add_field(array(
			'name' => 'Background',
			'id'   => $prefix . 'bg',
			'type' => 'colorpicker',
			'default' => '#ffffff',
		) );
		$cmb_post->add_field(array(
			'name' => 'Text Colour',
			'id'   => $prefix . 'col',
			'type' => 'colorpicker',
			'default' => '#111111',
		) );
		$cmb_post->add_field(array(
			'name' => 'Coming Soon Message',
			'id'   => $prefix . 'coming',
			'type' => 'textarea',
		) );
		$cmb_post->add_field(array(
			'name' => 'Publish Post On',
			'id'   => $prefix . 'date',
			'type' => 'text_datetime_timestamp',
		) );
	}


	add_action( 'cmb2_init', 'home_page' );
	function home_page() {
		$prefix = '_home_';
		$cmb_home = new_cmb2_box( array(
			'id'			=> 'home',
			'title'		 => 'Page Sections',
			'object_types'  => array( 'page' ),
			'show_in_rest'	=> true,
			'show_on'	  => array( 'key' => 'page-template', 'value' => 'page-home.php' ),
		) );

		$home_group = $cmb_home->add_field( array(
			'id' => $prefix . 'home',
			'type' => 'group',
			'options'	 => array(
				'group_title'   => __( 'Section {#}', 'bci' ),
				'add_button'	=> __( 'Add New Section', 'bci' ),
				'remove_button' => __( 'Remove Section', 'bci' ),
				'sortable'	  => true,
			),
		) );
		$cmb_home->add_group_field( $home_group, array(
			'name' => 'CTA',
			'id'   => $prefix . 'header',
			'type' => 'text',
		) );
		$cmb_home->add_group_field( $home_group, array(
			'name' => 'Title',
			'id'   => $prefix . 'title',
			'type' => 'text',
		) );
		$cmb_home->add_group_field( $home_group, array(
			'name' => 'Content',
			'id'   => $prefix . 'stuff',
			'type' => 'wysiwyg',
		) );
		$cmb_home->add_group_field( $home_group, array(
			'name' => 'Background',
			'id'   => $prefix . 'bg',
			'type' => 'colorpicker',
			'default' => '#ffffff',
		) );
		$cmb_home->add_group_field( $home_group, array(
			'name' => 'Text Colour',
			'id'   => $prefix . 'col',
			'type' => 'colorpicker',
			'default' => '#111111',
		) );
	}