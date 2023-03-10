<?php
	if ( ! defined( 'ABSPATH' ) ) {
		exit;
	}
	$post_id          = $post_id ?? get_the_id();
	$product_id       = $product_id ?? MPWPB_Function::get_post_info( $post_id, 'link_wc_product' );
	$all_services     = $all_services ?? MPWPB_Function::get_post_info( $post_id, 'mpwpb_category_infos', array() );
	$all_category     = $all_category ?? MPWPB_Function::get_category( $post_id );
	$all_sub_category = $all_sub_category ?? MPWPB_Function::get_sub_category( $post_id );
	$all_service_list = $all_service_list ?? MPWPB_Function::get_all_service( $post_id );
	$extra_services   = $extra_services ?? MPWPB_Function::get_post_info( $post_id, 'mpwpb_extra_service', array() );
?>
	<div class="mpwpb_summary_area">
		<h3 class="mB_xs"><?php esc_html_e( 'Order Summary', 'mpwpb_plugin' ); ?></h3>
		<div class="divider"></div>
		<div class="justifyBetween">
			<div class="flexWrap">
				<h5><?php esc_html_e( 'Service : ', 'mpwpb_plugin' ); ?></h5>&nbsp;
				<?php if ( sizeof( $all_category ) > 0 ) { ?>
					<div class="mpwpb_summary_item" data-category>
						<div class="_dFlex_alignCenter">
							<h6></h6>
							<span class="fas fa-long-arrow-alt-right _mLR_xs"></span>
						</div>
					</div>
				<?php } ?>
				<?php if ( sizeof( $all_sub_category ) > 0 ) { ?>
					<div class="mpwpb_summary_item" data-sub-category>
						<div class="_dFlex_alignCenter">
							<h6></h6>
							<span class="fas fa-long-arrow-alt-right _mLR_xs"></span>
						</div>
					</div>
				<?php } ?>
				<?php if ( sizeof( $all_service_list ) > 0 ) { ?>
					<div class="mpwpb_summary_item" data-service>
						<h6></h6>
					</div>
				<?php } ?>
			</div>
			<h6>x1&nbsp;|&nbsp; <span class="service_price"></span></h6>
		</div>
		<?php
			if ( sizeof( $extra_services ) > 0 ) {
				foreach ( $extra_services as $group_service ) {
					$group_service_name = array_key_exists( 'group_service', $group_service ) ? $group_service['group_service'] : '';
					$ex_service_infos   = array_key_exists( 'group_service_info', $group_service ) ? $group_service['group_service_info'] : [];
					if ( sizeof( $ex_service_infos ) > 0 ) {
						foreach ( $ex_service_infos as $ex_service_info ) {
							$ex_service_price = array_key_exists( 'price', $ex_service_info ) ? $ex_service_info['price'] : 0;
							?>
							<div class="mpwpb_summary_item" data-extra-service="<?php echo esc_attr( $ex_service_info['name'] ); ?>">
								<div class="justifyBetween">
									<div class="flexWrap">
										<h5><?php esc_html_e( 'Extra Service : ', 'mpwpb_plugin' ); ?></h5>&nbsp;
											<?php if ( $group_service_name ) { ?>
												<div class="_dFlex_alignCenter">
													<h6><?php echo esc_html( $group_service_name ) ?></h6>
													<span class="fas fa-long-arrow-alt-right _mLR_xs"></span>
												</div>
											<?php } ?>
										<div class="_dFlex_alignCenter">
											<h6><?php echo esc_html( $ex_service_info['name'] ); ?></h6>
										</div>
									</div>
									<h6><span class="ex_service_qty">x1</span>&nbsp;|&nbsp;<?php echo MPWPB_Function::wc_price( $post_id, $ex_service_price ); ?></h6>
								</div>
							</div>
							<?php
						}
					}
				}
			}
		?>
		<div class="dFlex">
			<h5><?php esc_html_e( 'Date & Time : ', 'mpwpb_plugin' ); ?></h5>&nbsp;
			<div class="mpwpb_summary_item" data-date>
				<h6></h6>
			</div>
		</div>
		<div class="divider"></div>
		<div class="justifyBetween">
			<h3><?php esc_html_e( 'Total :', 'mpwpb_plugin' ); ?>&nbsp;&nbsp;</h3>
			<h3><i class="mpwpb_total_bill textTheme"><?php echo MPWPB_Function::wc_price( $post_id, 0 ); ?></i></h3>
		</div>
		<?php do_action('add_mpwpb_summary_section',$post_id); ?>

		<div class="divider"></div>
		<div class="justifyBetween">
			<div></div>
			<div class="mT_xs">
				<button class="_mpBtn_mT_xs_radius mActive mpwpb_book_now" type="button">
					<span class="fas fa-cart-plus mR_xs"></span>
					<?php esc_html_e( 'Add to Cart', 'mpwpb_plugin' ); ?>
				</button>
				<button type="submit" name="add-to-cart" value="<?php echo esc_html( $product_id ); ?>" class="dNone mpwpb_add_to_cart">
					<?php esc_html_e( 'Add to Cart', 'mpwpb_plugin' ); ?>
				</button>
			</div>
		</div>
	</div>
<?php