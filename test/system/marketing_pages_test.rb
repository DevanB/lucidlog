require "application_system_test_case"

class MarketingPagesTest < ApplicationSystemTestCase
  setup do
    @marketing_page = marketing_pages(:one)
  end

  test "visiting the index" do
    visit marketing_pages_url
    assert_selector "h1", text: "Marketing pages"
  end

  test "should create marketing page" do
    visit marketing_pages_url
    click_on "New marketing page"

    click_on "Create Marketing page"

    assert_text "Marketing page was successfully created"
    click_on "Back"
  end

  test "should update Marketing page" do
    visit marketing_page_url(@marketing_page)
    click_on "Edit this marketing page", match: :first

    click_on "Update Marketing page"

    assert_text "Marketing page was successfully updated"
    click_on "Back"
  end

  test "should destroy Marketing page" do
    visit marketing_page_url(@marketing_page)
    click_on "Destroy this marketing page", match: :first

    assert_text "Marketing page was successfully destroyed"
  end
end
