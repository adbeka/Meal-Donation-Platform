import type { Metadata } from "next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpCircle, Users, Utensils, UserCircle, Package, HeartHandshake, Wrench } from "lucide-react"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | MealShare",
  description: "Find answers to common questions about using MealShare",
}

export default function FAQPage() {
  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-10 space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
          Find answers to common questions about MealShare and how it works.
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-7">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span className="hidden md:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">For Users</span>
          </TabsTrigger>
          <TabsTrigger value="restaurants" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span className="hidden md:inline">For Restaurants</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" />
            <span className="hidden md:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="pickups" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden md:inline">Pickups</span>
          </TabsTrigger>
          <TabsTrigger value="donations" className="flex items-center gap-2">
            <HeartHandshake className="h-4 w-4" />
            <span className="hidden md:inline">Donations</span>
          </TabsTrigger>
          <TabsTrigger value="technical" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            <span className="hidden md:inline">Technical</span>
          </TabsTrigger>
        </TabsList>

        {/* General Questions */}
        <TabsContent value="general" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Questions</CardTitle>
              <CardDescription>Basic information about MealShare and how it works</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="what-is-mealshare">
                  <AccordionTrigger>What is MealShare?</AccordionTrigger>
                  <AccordionContent>
                    MealShare is a platform that connects restaurants with surplus food to individuals and organizations
                    in need. Our mission is to reduce food waste while helping those experiencing food insecurity.
                    Restaurants can list their surplus food, and users can reserve and pick up these items for free or
                    at a reduced cost.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="how-does-it-work">
                  <AccordionTrigger>How does MealShare work?</AccordionTrigger>
                  <AccordionContent>
                    Restaurants sign up and list their surplus food items. Users can browse available food, reserve
                    items for pickup, and collect them during the specified pickup window. This helps restaurants reduce
                    waste and helps people access food that would otherwise be thrown away.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="is-it-free">
                  <AccordionTrigger>Is MealShare free to use?</AccordionTrigger>
                  <AccordionContent>
                    Yes, MealShare is completely free for both restaurants and users. Restaurants may choose to offer
                    their surplus food for free or at a reduced cost, but there are no fees for using the platform
                    itself.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="where-available">
                  <AccordionTrigger>Where is MealShare available?</AccordionTrigger>
                  <AccordionContent>
                    MealShare is currently available in select cities across the United States. We're constantly
                    expanding to new locations. You can check if MealShare is available in your area by entering your
                    location on our homepage.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="mission">
                  <AccordionTrigger>What is MealShare's mission?</AccordionTrigger>
                  <AccordionContent>
                    MealShare's mission is to reduce food waste and combat food insecurity by creating an efficient
                    connection between restaurants with surplus food and people who need it. We believe that good food
                    should nourish people, not landfills.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* For Users */}
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>For Users</CardTitle>
              <CardDescription>Information for people looking to pick up food</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="how-to-find-food">
                  <AccordionTrigger>How do I find available food near me?</AccordionTrigger>
                  <AccordionContent>
                    Visit the "Restaurants" page and enter your location (city, address, or zip code). You'll see a list
                    of restaurants with available food items in your area. You can filter by distance, food type, and
                    pickup time.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="how-to-reserve">
                  <AccordionTrigger>How do I reserve food for pickup?</AccordionTrigger>
                  <AccordionContent>
                    Once you find food items you'd like to pick up, click the "Reserve Pickup" button on the
                    restaurant's page. Select the items you want, add any special notes, and confirm your reservation.
                    You'll receive a confirmation with pickup instructions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="pickup-process">
                  <AccordionTrigger>What's the pickup process like?</AccordionTrigger>
                  <AccordionContent>
                    Arrive at the restaurant during the specified pickup window. Let the staff know you're there for a
                    MealShare pickup and provide your name and reservation ID. The restaurant will give you the food
                    items you reserved. Once you've received your items, mark the pickup as "Completed" in your
                    MealShare account.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="food-quality">
                  <AccordionTrigger>Is the food safe to eat?</AccordionTrigger>
                  <AccordionContent>
                    Yes. All participating restaurants follow food safety guidelines and only list food that is safe for
                    consumption. The food is surplus, not expired or spoiled. Restaurants provide information about when
                    the food was prepared and any allergens it may contain.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="cancel-pickup">
                  <AccordionTrigger>How do I cancel a pickup?</AccordionTrigger>
                  <AccordionContent>
                    If you need to cancel a pickup, go to your "Pickups" page, find the reservation you want to cancel,
                    and click the "Cancel Pickup" button. Please try to cancel as early as possible so the restaurant
                    can make the food available to others.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* For Restaurants */}
        <TabsContent value="restaurants" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>For Restaurants</CardTitle>
              <CardDescription>Information for restaurants wanting to reduce food waste</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="restaurant-signup">
                  <AccordionTrigger>How do I sign up my restaurant?</AccordionTrigger>
                  <AccordionContent>
                    First, create a user account. Then, go to your profile page and click "Register as a Restaurant."
                    Fill out the required information about your restaurant, including name, address, and contact
                    details. Once approved, you can start listing food items.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="list-food">
                  <AccordionTrigger>How do I list food items?</AccordionTrigger>
                  <AccordionContent>
                    After registering your restaurant, go to your Restaurant Dashboard and click on "Food Listings."
                    Click "Add New Food Item" and fill out the details including name, description, quantity, category,
                    and pickup window. You can also add a photo of the food item.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="manage-pickups">
                  <AccordionTrigger>How do I manage pickup requests?</AccordionTrigger>
                  <AccordionContent>
                    In your Restaurant Dashboard, go to "Manage Pickups" to see all current pickup requests. You can
                    view details about each pickup, including the items requested and the pickup time. You can also mark
                    pickups as completed once the user has collected their food.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="restaurant-benefits">
                  <AccordionTrigger>What are the benefits for my restaurant?</AccordionTrigger>
                  <AccordionContent>
                    By participating in MealShare, your restaurant can reduce food waste, lower disposal costs,
                    potentially receive tax benefits for donations, improve your environmental impact, enhance community
                    relations, and gain positive publicity as a socially responsible business.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="food-safety">
                  <AccordionTrigger>What are the food safety requirements?</AccordionTrigger>
                  <AccordionContent>
                    All food items must comply with local health department regulations. Food should be properly stored
                    at safe temperatures and protected from contamination. You must provide accurate information about
                    preparation time, ingredients, and allergens. MealShare is not responsible for food safety issues,
                    but we do monitor user feedback.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account & Profile */}
        <TabsContent value="account" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account & Profile</CardTitle>
              <CardDescription>Information about managing your MealShare account</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="create-account">
                  <AccordionTrigger>How do I create an account?</AccordionTrigger>
                  <AccordionContent>
                    Click the "Sign Up" button in the top right corner of the page. Enter your email address, create a
                    password, and fill in your profile information. Verify your email address by clicking the link sent
                    to your inbox, and your account will be active.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="forgot-password">
                  <AccordionTrigger>I forgot my password. How do I reset it?</AccordionTrigger>
                  <AccordionContent>
                    On the login page, click "Forgot Password?" Enter the email address associated with your account,
                    and we'll send you a password reset link. Click the link in the email and follow the instructions to
                    create a new password.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="update-profile">
                  <AccordionTrigger>How do I update my profile information?</AccordionTrigger>
                  <AccordionContent>
                    Log in to your account and go to your Profile page by clicking on your name in the top right corner.
                    Click "Edit Profile" to update your personal information, contact details, and preferences. Don't
                    forget to save your changes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="delete-account">
                  <AccordionTrigger>How do I delete my account?</AccordionTrigger>
                  <AccordionContent>
                    To delete your account, go to your Profile page and click on "Settings." Scroll down to the bottom
                    of the page and click "Delete Account." You'll be asked to confirm this action. Please note that
                    account deletion is permanent and cannot be undone.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="privacy">
                  <AccordionTrigger>How is my personal information protected?</AccordionTrigger>
                  <AccordionContent>
                    MealShare takes your privacy seriously. We only collect information necessary to provide our
                    service. Your personal data is encrypted and stored securely. We never share your information with
                    third parties without your consent. For more details, please review our Privacy Policy.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pickups */}
        <TabsContent value="pickups" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Pickups</CardTitle>
              <CardDescription>Information about food pickups and reservations</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="pickup-window">
                  <AccordionTrigger>What is a pickup window?</AccordionTrigger>
                  <AccordionContent>
                    A pickup window is the timeframe during which you can collect your reserved food items from the
                    restaurant. It's set by the restaurant based on their operating hours and when the food is
                    available. It's important to arrive during this window, as the restaurant may not be able to hold
                    your items beyond this time.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="late-pickup">
                  <AccordionTrigger>What happens if I'm late for my pickup?</AccordionTrigger>
                  <AccordionContent>
                    If you're running late, contact the restaurant directly as soon as possible. Some restaurants may be
                    able to hold your items for a short time, but this is at their discretion. If you miss your pickup
                    window entirely, your reservation may be canceled, and the items may be made available to other
                    users.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="pickup-limit">
                  <AccordionTrigger>Is there a limit to how many items I can pick up?</AccordionTrigger>
                  <AccordionContent>
                    Restaurants may set limits on the quantity of items that can be reserved by a single user to ensure
                    fair distribution. These limits will be clearly indicated when you make your reservation.
                    Additionally, MealShare monitors pickup patterns to prevent abuse of the system.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="pickup-proof">
                  <AccordionTrigger>Do I need to show ID or proof of reservation?</AccordionTrigger>
                  <AccordionContent>
                    When you arrive for your pickup, you should be prepared to provide your name and reservation ID,
                    which can be found in your MealShare account under "Pickups." Some restaurants may ask to see the
                    reservation confirmation on your phone. Photo ID is not typically required but may be requested by
                    some restaurants.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="pickup-frequency">
                  <AccordionTrigger>How often can I reserve pickups?</AccordionTrigger>
                  <AccordionContent>
                    There is no set limit on how frequently you can reserve pickups. However, we encourage users to only
                    reserve what they need and can use to prevent waste. MealShare monitors usage patterns and may
                    implement limits if we notice excessive reservations that result in no-shows or cancellations.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Donations */}
        <TabsContent value="donations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Donations</CardTitle>
              <CardDescription>Information about monetary donations to support MealShare</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="why-donate">
                  <AccordionTrigger>Why should I donate to MealShare?</AccordionTrigger>
                  <AccordionContent>
                    While MealShare is free to use, we rely on donations to maintain and improve our platform, expand to
                    new areas, and support our mission of reducing food waste and fighting hunger. Your donations help
                    us connect more restaurants with people in need and develop new features to enhance the user
                    experience.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="donation-use">
                  <AccordionTrigger>How are donations used?</AccordionTrigger>
                  <AccordionContent>
                    Donations to MealShare are used to cover operational costs, develop new features, expand to new
                    locations, provide resources to participating restaurants, and fund educational initiatives about
                    food waste and food insecurity. We are committed to transparency and publish annual reports
                    detailing how donations are used.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tax-deductible">
                  <AccordionTrigger>Are donations tax-deductible?</AccordionTrigger>
                  <AccordionContent>
                    Yes, MealShare is a registered 501(c)(3) non-profit organization, so donations are tax-deductible in
                    the United States. After making a donation, you will receive a receipt that you can use for tax
                    purposes. Please consult with a tax professional for advice specific to your situation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="donation-methods">
                  <AccordionTrigger>What payment methods can I use to donate?</AccordionTrigger>
                  <AccordionContent>
                    MealShare accepts donations via credit/debit card, PayPal, and bank transfer. For larger donations
                    or corporate giving, please contact our donations team at donations@mealshare.org to discuss options
                    such as wire transfers or checks.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="recurring-donations">
                  <AccordionTrigger>Can I set up recurring donations?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can set up monthly, quarterly, or annual recurring donations. This helps us plan our budget
                    and ensures consistent support for our programs. You can manage your recurring donations at any time
                    through your MealShare account under the "Donations" section.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technical Support */}
        <TabsContent value="technical" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Technical Support</CardTitle>
              <CardDescription>Help with technical issues and app functionality</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="app-issues">
                  <AccordionTrigger>The app isn't working properly. What should I do?</AccordionTrigger>
                  <AccordionContent>
                    First, try refreshing the page or restarting the app. Make sure you're using a supported browser
                    (Chrome, Firefox, Safari, or Edge) and that it's updated to the latest version. Clear your browser
                    cache and cookies. If the issue persists, contact our support team with details about the problem,
                    including screenshots if possible.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="login-issues">
                  <AccordionTrigger>I can't log in to my account. What should I do?</AccordionTrigger>
                  <AccordionContent>
                    First, make sure you're using the correct email address and password. Check if Caps Lock is on. If
                    you've forgotten your password, use the "Forgot Password" link on the login page. If you still can't
                    log in, your account may be temporarily locked for security reasons. Contact our support team for
                    assistance.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="notification-issues">
                  <AccordionTrigger>I'm not receiving notifications. How can I fix this?</AccordionTrigger>
                  <AccordionContent>
                    Check your notification settings in your profile to ensure they're enabled. Make sure your email
                    address is correct and that our emails aren't being filtered to your spam folder. Add
                    support@mealshare.org to your contacts. If you've enabled browser notifications, check your browser
                    settings to ensure they're allowed for our site.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="report-bug">
                  <AccordionTrigger>How do I report a bug or technical issue?</AccordionTrigger>
                  <AccordionContent>
                    You can report bugs or technical issues through our Contact page. Please provide as much detail as
                    possible, including what you were doing when the issue occurred, what device and browser you were
                    using, and screenshots if applicable. This helps our development team identify and fix the problem
                    more quickly.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="supported-devices">
                  <AccordionTrigger>What devices and browsers are supported?</AccordionTrigger>
                  <AccordionContent>
                    MealShare works on most modern devices, including desktops, laptops, tablets, and smartphones. We
                    support the latest versions of Chrome, Firefox, Safari, and Edge browsers. For the best experience,
                    we recommend using an updated browser and operating system. Our mobile app is available for iOS and
                    Android devices.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12 rounded-lg border bg-green-50 p-6 text-center">
        <h2 className="mb-2 text-xl font-semibold text-green-800">Still have questions?</h2>
        <p className="mb-4 text-green-700">
          If you couldn't find the answer you were looking for, please don't hesitate to contact us.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Contact Support
        </a>
      </div>
    </div>
  )
}
