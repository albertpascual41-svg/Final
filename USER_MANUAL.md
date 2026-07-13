# Gohan Water Refilling Station
## User Manual Guide

**Version:** 1.0  
**System:** Water Refilling and Delivery Management System  
**Date:** June 2024

---

## Table of Contents
1. [Overview](#overview)
2. [System Login](#system-login)
3. [Administrator Guide](#administrator-guide)
4. [Cashier Guide](#cashier-guide)
5. [Rider Guide](#rider-guide)
6. [Common Features](#common-features)
7. [Troubleshooting](#troubleshooting)

---

## Overview

The Gohan Water Refilling Station POS system is a comprehensive solution designed to manage water product sales, deliveries, and inventory. The system supports three user roles with different functionalities:

- **Administrator**: Full system access, reporting, and management
- **Cashier**: Point of Sale operations and order management
- **Rider**: Delivery management and status updates

### System Features
- Real-time inventory management
- Order processing (walk-in and delivery)
- Sales analytics and reporting
- Rider and delivery tracking
- Product catalog management
- Payment processing

---

## System Login

### Accessing the System

1. Open the Gohan Water Refilling Station application in your browser
2. You will see the login screen with fields for:
   - **Username**
   - **Password**

### User Accounts

| Role | Username | Password | Name |
|------|----------|----------|------|
| Administrator | admin | admin123 | Administrator |
| Cashier | cashier | cash123 | Albert |
| Rider | rider | ride123 | Andrei |

### Login Steps

1. Enter your assigned username in the Username field
2. Enter your password in the Password field
3. Click the **"Login"** button
4. You will be directed to your dashboard based on your role

### Session Management

- Your session will remain active during your work
- Use the **"Logout"** button (top-right corner) to safely end your session
- Sessions are stored locally in your browser

---

## Administrator Guide

### Dashboard

The Admin Dashboard provides an overview of the entire system:

**Key Information Displayed:**
- Total sales and revenue
- Monthly sales trends
- Order summary (total, completed, pending)
- Inventory status
- Recent activities

### 1. Orders Management

**Accessing Orders:**
- Click the **"Orders"** menu item from the left navigation

**Order Information Available:**
- Order ID
- Date and time
- Customer name and address
- Items ordered with quantities
- Assigned rider
- Order status (Pending, Out for Delivery, Delivered)
- Assigned cashier

**Order Statuses:**
- **Pending** - Order awaiting rider assignment
- **Out for Delivery** - Order currently being delivered
- **Delivered** - Order successfully completed
- **Walk-in** - Counter sales (no delivery)

**Actions:**
- View detailed order information
- Track delivery status
- Filter orders by date, status, or rider

### 2. Products Management

**Accessing Products:**
- Click the **"Products"** menu item

**Available Products:**
The system includes water products in three categories:

**Bottles:**
- Mineral Water Bottle (500ml) - ₱8.93
- Purified Water Bottle (1L) - ₱13.39
- Alkaline Water Bottle (750ml) - ₱17.86
- Flavored Water Bottle (500ml) - ₱22.32

**Gallons:**
- Spring Water Gallon (1 gal) - ₱35.71
- Purified 5-Gal Jug (5 gal) - ₱53.57

**Tanks:**
- Water Station Tank (25L) - ₱89.29
- Large Storage Tank (50L) - ₱160.71

**Product Management Actions:**
- View all products with current pricing and stock levels
- Edit product details (price, minimum stock level)
- Monitor stock levels
- Add new products to the catalog

### 3. Inventory Management

**Accessing Inventory:**
- Click the **"Inventory"** menu item

**Inventory Information:**
- Current stock levels for each product
- Minimum stock thresholds
- Product type and size
- Low stock warnings (when stock falls below minimum)

**Actions:**
- Add stock/receive new inventory
- Adjust quantities
- View stock history
- Set minimum stock alerts

### 4. Riders Management

**Accessing Riders:**
- Click the **"Riders"** menu item

**Rider Information:**
- Rider ID and name
- Assigned delivery area (e.g., "All Zones")
- Contact phone number
- Current delivery status

**Actions:**
- View all registered riders
- Add new riders
- Update rider information
- Manage rider assignments
- Track rider performance

### 5. Analytics & Reporting

**Accessing Analytics:**
- Click the **"Analytics"** menu item

**Reports Available:**
- **Sales Overview**: Monthly sales trends and totals
- **Revenue Report**: Income breakdown
- **Order Analytics**: Order completion rates
- **Inventory Status**: Stock movements
- **Performance Metrics**: Rider and cashier performance

**Features:**
- View data by date range
- Export reports
- Print analytics
- Trend analysis

---

## Cashier Guide

### Dashboard

The Cashier Dashboard shows:
- Daily sales summary
- Total transactions
- Pending orders
- Quick access to POS

### 1. Point of Sale (POS)

**Accessing POS:**
- Click the **"Point of Sale"** menu item
- This is your main workspace for processing customer purchases

**POS Features:**

**Creating a New Sale:**
1. Click **"New Transaction"**
2. Select order type:
   - **Walk-in** - Customer present at counter
   - **Delivery** - Customer ordering for delivery
3. If delivery:
   - Enter customer name
   - Enter delivery address
4. Add items to the cart:
   - Click **"Add Item"** button
   - Select product from the catalog
   - Enter quantity needed
   - Click **"Add to Cart"**
5. Review the transaction:
   - Check all items and quantities
   - Verify prices automatically calculated
   - System applies VAT (12%) automatically
6. Complete payment:
   - Review total amount (including VAT)
   - Collect payment from customer
   - Click **"Complete Transaction"**
7. Print receipt (optional)
   - Click **"Print"** button to generate receipt

**Transaction Details:**
- Item name and size
- Unit price
- Quantity
- Line total
- Subtotal
- VAT amount (12%)
- Final total with VAT

### 2. My Orders

**Accessing Your Orders:**
- Click the **"My Orders"** menu item
- View all orders you have processed

**Order Information:**
- Order ID
- Customer name and address
- Items ordered
- Order date and time
- Assigned rider (if delivery)
- Current status

**Actions:**
- View order details
- Reassign orders to different riders
- Update order status
- Modify pending orders

### 3. Products View

**Accessing Products:**
- Click the **"Products"** menu item
- Quick reference of all available products and pricing

**Information Displayed:**
- Product name and size
- Current price
- Stock availability
- Product type (Bottle, Gallon, Tank)

### 4. Inventory Check

**Accessing Inventory:**
- Click the **"Inventory"** menu item
- View current stock levels
- Check minimum stock requirements
- Note low stock items for reordering alerts

---

## Rider Guide

### Dashboard

The Rider Dashboard shows:
- Your assigned deliveries
- Route information
- Customer details
- Delivery status summary

### 1. Delivery Management

**Viewing Assigned Deliveries:**
- All pending and in-progress deliveries are listed
- Shows customer name and address
- Displays items to be delivered
- Shows estimated delivery information

**Delivery Information Provided:**
- Order ID
- Customer name and contact
- Delivery address
- Items and quantities
- Special instructions (if any)

**Updating Delivery Status:**

For each delivery, you can update the status:

1. **Out for Delivery**
   - Click order to mark as "Out for Delivery"
   - Shows you're heading to customer location

2. **Delivered**
   - Click order to mark as "Delivered"
   - Confirms successful delivery
   - Updates inventory accordingly

3. **Issues/Delays**
   - Note any special statuses or issues
   - Keep administrator informed of problems

**Delivery Process:**
1. Check your pending deliveries at start of shift
2. Plan your route based on addresses
3. Proceed to each customer location
4. Verify items before customer signing
5. Update status to "Out for Delivery"
6. Upon successful delivery, mark as "Delivered"
7. Return to station to update system

### 2. Performance Tracking

- System tracks your delivery completion rate
- Monitor your area of responsibility ("All Zones")
- View your historical performance in admin reports

---

## Common Features

### Search Functionality

Available across multiple modules:
- **Customer Search**: Find customers by name or order ID
- **Product Search**: Find products by name or category
- **Order Search**: Filter by date, status, or customer

### Filters

Quickly filter data:
- By date range
- By status
- By product type
- By assigned staff

### Print Functions

Print important documents:
- **Receipts**: Customer transaction receipts
- **Reports**: Daily sales, inventory, analytics
- **Packing Lists**: For delivery orders
- **Order Confirmations**

### Visibility Controls

Many screens include visibility toggles (Eye/Eye-Off icons):
- Toggle detailed information display
- Show/hide sensitive data as needed

### Data Export

- Export orders and sales data
- Generate reports in various formats
- Archive historical data

---

## Troubleshooting

### Login Issues

**Problem: Cannot login**
- **Solution**: Verify username and password are correct (case-sensitive)
- **Solution**: Clear browser cache and cookies, try again
- **Solution**: Ensure browser JavaScript is enabled

**Problem: Session expired**
- **Solution**: Login again with your credentials
- **Solution**: Check your browser's cookie settings

### Transaction Issues

**Problem: Item not adding to cart**
- **Solution**: Verify item is in stock
- **Solution**: Try refreshing the page
- **Solution**: Clear browser cache

**Problem: Price calculation appears incorrect**
- **Solution**: Remember VAT (12%) is automatically added
- **Solution**: Verify quantity entered is correct
- **Solution**: Check product pricing hasn't been updated

### Order Management

**Problem: Cannot assign rider to delivery**
- **Solution**: Verify rider is registered in the system
- **Solution**: Check rider is available (not on another delivery)
- **Solution**: Ensure order has complete customer address

**Problem: Order status not updating**
- **Solution**: Refresh the page
- **Solution**: Verify your user role has permission for that action
- **Solution**: Check system connection

### Inventory Issues

**Problem: Stock levels incorrect**
- **Solution**: Verify recent inventory adjustments
- **Solution**: Check for stock received but not yet recorded
- **Solution**: Review returned items or damaged stock

**Problem: Low stock warning not appearing**
- **Solution**: Verify minimum stock level is set correctly
- **Solution**: Refresh the page

### Performance & Technical

**Problem: System is slow**
- **Solution**: Close other browser tabs
- **Solution**: Clear browser cache
- **Solution**: Try a different browser
- **Solution**: Check internet connection

**Problem: Cannot print**
- **Solution**: Verify printer is connected and powered on
- **Solution**: Check browser print settings
- **Solution**: Try print preview first

**Problem: Data not saving**
- **Solution**: Check internet connection
- **Solution**: Verify you're logged in with proper permissions
- **Solution**: Refresh the page and try again
- **Solution**: Check system notifications for errors

### Getting Help

If you encounter an issue not listed above:
1. Note the exact error message
2. Record what you were trying to do
3. Note your user role
4. Contact the system administrator with this information

---

## Contact & Support

**System Administrator**: For technical issues or account problems  
**Manager**: For business process or operational questions  
**Technical Support**: For system errors or bugs

---

## Additional Notes

- All prices are in Philippine Pesos (₱)
- VAT rate is fixed at 12%
- System records all transactions for audit purposes
- Regular backups are performed automatically
- Keep your password confidential
- Always logout before leaving your workstation

---

**Document Version**: 1.0  
**Last Updated**: June 2024  
**Next Review**: December 2024
