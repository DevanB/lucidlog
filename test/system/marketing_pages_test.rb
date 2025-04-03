require "application_system_test_case"

class MarketingPagesTest < ApplicationSystemTestCase
  test "visit the home page" do
    visit root_path
    assert_selector "h1", text: "Let's get started"
  end
end
