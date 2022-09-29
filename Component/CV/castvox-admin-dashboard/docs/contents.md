# Contents

Discover what’s included in Bootstrap, including our precompiled and source code flavors.
Remember, Bootstrap’s JavaScript components require Bootstrap Vue.

<hr>

#### Nuxt Argon Dashboard PRO Structure

Once downloaded, unzip the compressed folder and you’ll see something like this:

```
|-- nuxt-argon-dashboard-pro
│   app.html
│   nuxt.config.js
│   package-lock.json
│   package.json
│   polyfills.js
│   yarn.lock
│
├───assets
│   ├───css
│   │   │   style.css
│   │   │
│   │   ├───font-awesome
│   │   └───nucleo
│   └───sass
│       │   argon.scss
│       │
│       ├───core
│       └───custom
├───components
│   │   ValidationError.vue
│   │
│   ├───argon-core
│   │   │   Badge.vue
│   │   │   BaseAlert.vue
│   │   │   BaseButton.vue
│   │   │   BaseDropdown.vue
│   │   │   BaseHeader.vue
│   │   │   BasePagination.vue
│   │   │   BaseProgress.vue
│   │   │   BaseSlider.vue
│   │   │   BaseSwitch.vue
│   │   │   BaseTable.vue
│   │   │   ButtonCheckbox.vue
│   │   │   ButtonRadioGroup.vue
│   │   │   CloseButton.vue
│   │   │   index.js
│   │   │   LoadingPanel.vue
│   │   │   Modal.vue
│   │   │   NavbarToggleButton.vue
│   │   │
│   │   ├───Breadcrumb
│   │   │       Breadcrumb.vue
│   │   │       BreadcrumbItem.vue
│   │   │       RouteBreadcrumb.vue
│   │   │
│   │   ├───Cards
│   │   │       Card.vue
│   │   │       StatsCard.vue
│   │   │
│   │   ├───Charts
│   │   │       BarChart.js
│   │   │       config.js
│   │   │       DoughnutChart.js
│   │   │       globalOptionsMixin.js
│   │   │       LineChart.js
│   │   │       optionHelpers.js
│   │   │       PieChart.js
│   │   │
│   │   ├───Collapse
│   │   │       Collapse.vue
│   │   │       CollapseItem.vue
│   │   │
│   │   ├───Feed
│   │   │       Comment.vue
│   │   │
│   │   ├───Inputs
│   │   │       BaseCheckbox.vue
│   │   │       BaseInput.vue
│   │   │       BaseRadio.vue
│   │   │       DropzoneFileUpload.vue
│   │   │       FileInput.vue
│   │   │       HtmlEditor.vue
│   │   │       IconCheckbox.vue
│   │   │       TagsInput.vue
│   │   │
│   │   ├───Navbar
│   │   │       BaseNav.vue
│   │   │       NavbarToggleButton.vue
│   │   │
│   │   ├───NotificationPlugin
│   │   │       index.js
│   │   │       Notification.vue
│   │   │       Notifications.vue
│   │   │
│   │   ├───SidebarPlugin
│   │   │       index.js
│   │   │       SideBar.vue
│   │   │       SidebarItem.vue
│   │   │
│   │   ├───Tabs
│   │   │       Tab.vue
│   │   │       Tabs.vue
│   │   │
│   │   ├───Timeline
│   │   │       TimeLine.vue
│   │   │       TimeLineItem.vue
│   │   │
│   │   └───WorldMap
│   │           AsyncWorldMap.vue
│   │           WorldMap.vue
│   │
│   ├───Dashboard
│   │   └───Cards
│   │           UserEditCard.vue
│   │           UserPasswordCard.vue
│   │
│   ├───feed
│   │       Comment.vue
│   │
│   ├───layouts
│   │   └───argon
│   │           Content.vue
│   │           ContentFooter.vue
│   │           DashboardNavbar.vue
│   │
│   ├───pages
│   │   ├───calendar
│   │   │       BigCalendar.vue
│   │   │
│   │   ├───dashboard
│   │   │       ActivityFeed.vue
│   │   │       LightTable.vue
│   │   │       PageVisitsTable.vue
│   │   │       ProgressTrackList.vue
│   │   │       SocialTrafficTable.vue
│   │   │       TaskList.vue
│   │   │       UserList.vue
│   │   │
│   │   ├───forms
│   │   │       BrowserDefaultsValidation.vue
│   │   │       CustomStylesValidation.vue
│   │   │       ServerSideValidation.vue
│   │   │
│   │   ├───register
│   │   │       FailedRegistration.vue
│   │   │       SuccessfulRegistration.vue
│   │   │
│   │   └───UserProfile
│   │           EditProfileForm.vue
│   │           UserCard.vue
│   │
│   ├───tables
│   │   │   projects.js
│   │   │   users.js
│   │   │   users2.js
│   │   │
│   │   ├───PaginatedTables
│   │   │       clientPaginationMixin.js
│   │   │
│   │   └───RegularTables
│   │           CheckboxColoredTable.vue
│   │           CheckboxTable.vue
│   │           DarkTable.vue
│   │           InlineActionsTable.vue
│   │           LightTable.vue
│   │           StripedTable.vue
│   │           TranslucentTable.vue
│   │
│   └───widgets
│           CalendarWidget.vue
│           CreditCard.vue
│           MembersCard.vue
│           PaypalCard.vue
│           ProgressTrackList.vue
│           StatsCards.vue
│           TaskList.vue
│           TimelineCard.vue
│           VectorMapCard.vue
│           VisaCard.vue
│
├───layouts
│       AuthLayout.vue
│       DashboardLayout.vue
│       error1.vue
│
├───middleware
│       admin.js
│       admin_creator.js
│       README.md
│       redirect.js
│
├───mixins
│       form-mixin.js
│       global.js
│       pagination.js
│
├───pages
│   │   alternative.vue
│   │   calendar.vue
│   │   charts.vue
│   │   dashboard.vue
│   │   index.vue
│   │   lock.vue
│   │   login.vue
│   │   pricing.vue
│   │   register.vue
│   │   widgets.vue
│   │
│   ├───components
│   │       buttons.vue
│   │       cards.vue
│   │       grid-system.vue
│   │       icons.vue
│   │       notifications.vue
│   │       typography.vue
│   │
│   ├───examples
│   │   ├───category-management
│   │   │   │   add-category.vue
│   │   │   │   index.vue
│   │   │   │
│   │   │   └───edit-category
│   │   │           _id.vue
│   │   │
│   │   ├───item-management
│   │   │   │   add-item.vue
│   │   │   │   index.vue
│   │   │   │
│   │   │   └───edit-item
│   │   │           _id.vue
│   │   │
│   │   ├───role-management
│   │   │   │   add-role.vue
│   │   │   │   index.vue
│   │   │   │
│   │   │   └───edit-role
│   │   │           _id.vue
│   │   │
│   │   ├───tag-management
│   │   │   │   add-tag.vue
│   │   │   │   index.vue
│   │   │   │
│   │   │   └───edit-tag
│   │   │           _id.vue
│   │   │
│   │   ├───user-management
│   │   │   │   add-user.vue
│   │   │   │   index.vue
│   │   │   │
│   │   │   └───edit-user
│   │   │           _id.vue
│   │   │
│   │   └───user-profile
│   │           index.vue
│   │
│   ├───forms
│   │       components.vue
│   │       elements.vue
│   │       validation.vue
│   │
│   ├───maps
│   │       google.vue
│   │       vector.vue
│   │
│   ├───pages
│   │       timeline.vue
│   │       user.vue
│   │
│   ├───password
│   │       email.vue
│   │       reset.vue
│   │
│   └───tables
│           paginated.vue
│           regular.vue
│           sortable.vue
│
├───plugins
│   │   axios.js
│   │   elementUi.js
│   │   README.md
│   │
│   └───dashboard
│       │   dashboard-plugin.js
│       │   full-calendar.js
│       │   globalComponents.js
│       │   globalDirectives.js
│       │   JsonApi.js
│       │   world-map.js
│       │
│       └───directives
│               click-outside.js
│
├───services
│       categories-service.js
│       items-service.js
│       profile-service.js
│       roles-service.js
│       tags-service.js
│       users-service.js
│
├───static
│   │   .nojekyll
│   │   favicon.png
│   │   loading.gif
│   │   README.md
│   │   sw.js
│   │
│   └───img
│       │   examples_image.png
│       │   loading.gif
│       │   placeholder.jpg
│       │
│       ├───brand
│       │       favicon.png
│       │       green.png
│       │       white.png
│       │
│       ├───icons
│       │   ├───cards
│       │   │       bitcoin.png
│       │   │       mastercard.png
│       │   │       paypal.png
│       │   │       visa.png
│       │   │
│       │   ├───common
│       │   │       github.svg
│       │   │       google.svg
│       │   │
│       │   └───flags
│       │           DE.png
│       │           GB.png
│       │           US.png
│       │
│       └───theme
│               angular.jpg
│               bootstrap.jpg
│               img-1-1000x600.jpg
│               img-1-1000x900.jpg
│               landing-1.png
│               landing-2.png
│               landing-3.png
│               profile-cover.jpg
│               react.jpg
│               sketch.jpg
│               team-1.jpg
│               team-2.jpg
│               team-3.jpg
│               team-4.jpg
│               team-5.jpg
│               vue.jpg
│
├───store
│       categories.js
│       index.js
│       items.js
│       profile.js
│       README.md
│       register.js
│       roles.js
│       tags.js
│       users.js
│
└───util
        API_KEY.js
        authCustomStrategy.js
        throttle.js

```

#### Bootstrap components

Here is the list of Bootstrap 4 components that were restyled in Argon:

<div class="row row-grid mt-5">
  <div class="col-md-3">
    <div class="card shadow-sm">
      <div class="p-4 text-center">
        <h6 class="mb-0">Alerts</h6>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card shadow-sm">
      <div class="p-4 text-center">
        <h6 class="mb-0">Badge</h6>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card shadow-sm">
      <div class="p-4 text-center">
        <h6 class="mb-0">Buttons</h6>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card shadow-sm">
      <div class="p-4 text-center">
        <h6 class="mb-0">Carousel</h6>
      </div>
    </div>
  </div>
</div>

<div class="row row-grid">
  <div class="col-md-3">
    <div class="card shadow-sm">
      <div class="p-4 text-center">
        <h6 class="mb-0">Dropdowns</h6>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card shadow-sm">
      <div class="p-4 text-center">
        <h6 class="mb-0">Forms</h6>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card shadow-sm">
      <div class="p-4 text-center">
        <h6 class="mb-0">Modal</h6>
      </div>
    </div>
  </div>
  <div class="col-md-3">
    <div class="card shadow-sm">
      <div class="p-4 text-center">
        <h6 class="mb-0">Navs</h6>
      </div>
    </div>
  </div>
</div>
