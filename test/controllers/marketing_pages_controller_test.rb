require "test_helper"

class MarketingPagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @marketing_page = marketing_pages(:one)
  end

  test "should get index" do
    get marketing_pages_url
    assert_response :success
  end

  test "should get new" do
    get new_marketing_page_url
    assert_response :success
  end

  test "should create marketing_page" do
    assert_difference("MarketingPage.count") do
      post marketing_pages_url, params: { marketing_page: {} }
    end

    assert_redirected_to marketing_page_url(MarketingPage.last)
  end

  test "should show marketing_page" do
    get marketing_page_url(@marketing_page)
    assert_response :success
  end

  test "should get edit" do
    get edit_marketing_page_url(@marketing_page)
    assert_response :success
  end

  test "should update marketing_page" do
    patch marketing_page_url(@marketing_page), params: { marketing_page: {} }
    assert_redirected_to marketing_page_url(@marketing_page)
  end

  test "should destroy marketing_page" do
    assert_difference("MarketingPage.count", -1) do
      delete marketing_page_url(@marketing_page)
    end

    assert_redirected_to marketing_pages_url
  end
end
