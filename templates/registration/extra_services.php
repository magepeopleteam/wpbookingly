<?php
	if ( ! defined( 'ABSPATH' ) ) {
		die;
	}
	$post_id              = $post_id ?? get_the_id();
	$extra_services       = $extra_services ?? MPWPB_Function::get_post_info( $post_id, 'mpwpb_extra_service', array() );
	$service_text         = $service_text ?? MPWPB_Function::get_service_text( $post_id );
	$extra_service_active = $extra_service_active ?? MPWPB_Function::get_post_info( $post_id, 'mpwpb_extra_service_active', 'off' );
	if ( sizeof( $extra_services ) > 0 && $extra_service_active == 'on' ) {
		?>
		<div class="mpwpb_extra_service_area">
			<h3 class="mB_xs"><?php esc_html_e( 'Choose Extra Features (Optional)', 'mpwpb_plugin' ); ?></h3>
			<div class="divider"></div>
			<?php
				foreach ( $extra_services as $group_service ) {
					$group_service_name = array_key_exists( 'group_service', $group_service ) ? $group_service['group_service'] : '';
					$ex_service_infos   = array_key_exists( 'group_service_info', $group_service ) ? $group_service['group_service_info'] : [];
					if ( $group_service_name && sizeof( $ex_service_infos ) > 0 ) {
						?>
						<h3><?php echo esc_html( $group_service_name ); ?></h3>
						<?php
					}
					if ( sizeof( $ex_service_infos ) > 0 ) {
						foreach ( $ex_service_infos as $ex_service_info ) {
							$ex_service_price     = array_key_exists( 'price', $ex_service_info ) ? $ex_service_info['price'] : 0;
							$ex_service_price     = MPWPB_Function::wc_price( $post_id, $ex_service_price );
							$ex_service_price_raw = MPWPB_Function::price_convert_raw( $ex_service_price );
							$ex_service_image     = array_key_exists( 'image', $ex_service_info ) ? $ex_service_info['image'] : '';
							$ex_service_icon      = array_key_exists( 'icon', $ex_service_info ) ? $ex_service_info['icon'] : '';
							$ex_unique_id         = '#ex_service_' . uniqid();
							?>
							<div class="mpwpb_item_box dShadow_8 mpwpb_extra_service_item">
								<div class="dFlex">
									<?php if ( $ex_service_image ) { ?>
										<div class="service_img_area alignCenter">
											<div class="bg_image_area">
												<div data-bg-image="<?php echo esc_attr( MPWPB_Function::get_image_url( '', $ex_service_image, 'medium' ) ); ?>"></div>
											</div>
										</div>
									<?php } ?>
									<div class="fdColumn">
										<h4 class="justifyBetween">
											<span>
												<?php if ( $ex_service_icon ) { ?>
													<span class="<?php echo esc_attr( $ex_service_icon ); ?> _mR_xs"></span>
												<?php } ?>
												<?php echo esc_html( $ex_service_info['name'] ); ?>
											</span>
											<span><?php echo MPWPB_Function::esc_html( $ex_service_price ); ?></span>
										</h4>
										<div class="divider"></div>
										<div class="justifyBetween">
											<div class="mR_xs">
												<?php if ( $ex_service_info['details'] ) { ?>
													<p><?php echo esc_html( $ex_service_info['details'] ); ?></p>
												<?php } ?>
											</div>
											<div>
												<div class="alignCenter">
													<div class="mR_xs min_100" data-collapse="<?php echo esc_attr( $ex_unique_id ); ?>">
														<?php MPWPB_Layout::qty_input( 'mpwpb_extra_service_qty[]', $ex_service_price_raw, $ex_service_info['qty'], 1, 0, $ex_service_info['qty'] ); ?>
													</div>
													<button type="button" class="_mpBtn_radius_min_150 mpwpb_price_calculation" data-extra-item data-collapse-target="<?php echo esc_attr( $ex_unique_id ); ?>" data-open-icon="far fa-check-circle" data-close-icon="" data-open-text="<?php esc_attr_e( 'Select', 'mpwpb_plugin' ); ?>" data-close-text="<?php esc_attr_e( 'Selected', 'mpwpb_plugin' ); ?>" data-add-class="mActive">
														<input type="hidden" name="mpwpb_extra_service[]" data-value="<?php echo esc_attr( $group_service_name ); ?>" value=""/>
														<input type="hidden" name="mpwpb_extra_service_type[]" data-value="<?php echo esc_attr( $ex_service_info['name'] ); ?>" value=""/>
														<span data-text><?php esc_html_e( 'Select', 'mptbm_plugin' ); ?></span>
														<span data-icon class="mL_xs"></span>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<span class="fas fa-check mpwpb_item_check _circleIcon_xs"></span>
							</div>
							<?php
						}
					}
				}
			?>
		</div>
		<?php
	}