<?php

	function ch_theme_customiser( $wp_customize ) {

		$wp_customize->add_panel( 'ch_schema', array(
			'priority'			=> 30,
			'theme_supports'	=> '',
			'title'				=> __( 'Conway Hall Options', 'ch' ),
			'capability'		=> 'edit_theme_options',
		) );

		$wp_customize->add_section( 'ch_schema_section' , array(
			'title'				=> __( 'Ethical Society', 'ch' ),
			'priority'			=> 30,
			'description'		=> 'This section controls your society information as used on archives, pages & posts (some of it will only be visible to search engines for SEO purposes).',
			'panel'				=> 'ch_schema',
		) );
		$wp_customize->add_setting( 'ch_org' );
		$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'ch_org', array(
			'label'				=> __( 'Organisation Name', 'ch' ),
			'section'			=> 'ch_schema_section',
			'settings'			=> 'ch_org',
			'type'					=> 'input',
			'default'		=> 'Conway Hall Ethical Society',
		) ) );
		$wp_customize->add_setting( 'ch_charity' );
		$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'ch_charity', array(
			'label'				=> __( 'Charity Number', 'ch' ),
			'section'			=> 'ch_schema_section',
			'settings'			=> 'ch_charity',
			'type'				=> 'input',
			'default'			=> '1156033',
		) ) );
		$wp_customize->add_setting( 'ch_tagline' );
		$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'ch_tagline', array(
			'label'				=> __( 'Society Description', 'ch' ),
			'section'			=> 'ch_schema_section',
			'settings'			=> 'ch_tagline',
			'type'				=> 'textarea',
		) ) );
		$wp_customize->add_setting( 'ch_logo' );
		$wp_customize->add_control( new WP_customize_Image_Control( $wp_customize, 'ch_logo', array(
			'label'				=> __( 'Logo', 'ch' ),
			'section'			=> 'ch_schema_section',
			'settings'			=> 'ch_logo',
		) ) );

		$wp_customize->add_section( 'ch_footer_section' , array(
			'title'				=> __( 'Conway Hall Footer', 'ch' ),
			'priority'			=> 30,
			'description'		=> 'This section edits the address info in the footer.',
			'panel'				=> 'ch_schema',
		) );
		$wp_customize->add_setting( 'ch_address' );
		$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'ch_address', array(
			'label'				=> __( 'Address', 'ch' ),
			'section'			=> 'ch_footer_section',
			'settings'			=> 'ch_address',
			'type'				=> 'textarea',
		) ) );
		$wp_customize->add_setting( 'ch_phone' );
		$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'ch_phone', array(
			'label'				=> __( 'Phone Number', 'ch' ),
			'section'			=> 'ch_footer_section',
			'settings'			=> 'ch_phone',
			'type'				=> 'input',
			'default'			=> '020 7405 1818',
		) ) );
		$wp_customize->add_setting( 'ch_hours' );
		$wp_customize->add_control( new WP_Customize_Control( $wp_customize, 'ch_hours', array(
			'label'				=> __( 'Hours', 'ch' ),
			'section'			=> 'ch_footer_section',
			'settings'			=> 'ch_hours',
			'type'				=> 'textarea',
		) ) );

	}
	add_action( 'customize_register', 'ch_theme_customiser' );