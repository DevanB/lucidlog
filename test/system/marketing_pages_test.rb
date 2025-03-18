require "application_system_test_case"

class MarketingPagesTest < ApplicationSystemTestCase
  test "visit the home page" do
    visit root_path
    assert_selector "h1", text: "Let's get started"
    assert_current_path root_path
  end
end
